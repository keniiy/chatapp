const MessageModel = require("../models/Message");
const ChatModel = require("../models/Chat");
const UserModel = require("../models/User");

class MessageService {
  static async sendMessage(body) {
    try {
      const v_senderUserId = body.senderUserId;
      const message = await MessageModel.create({
        text: body.text,
      });

      const chat1 = await ChatModel.findOne({
        // this is for action when sender is user 1
        user1Id: v_senderUserId,
        user2Id: body.receiverUserId,
      }).then(async (chat1) => {
        if (chat1) {
          await chat1.user1MessageId.push({
            _id: message._id,
          });
          await chat1.save();
        } else {
          const chat2 = await Chat.findOne({
            // this is for action when sender is user 2
            user1Id: req.body.receiverUserId,
            user2Id: v_senderUserId,
          }).then(async (chat2) => {
            if (chat2) {
              await chat2.user2MessageId.push({
                _id: message._id,
              });
              await chat2.save();
            } else {
              await Chat.create({
                user1Id: v_senderUserId,
                user1MessageId: message._id,
                user2Id: req.body.receiverUserId,
              });
            }
          });
        }
      });

      return message;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMessage(body) {
    try {
      const v_senderUserId = body.senderUserId;
      const v_receiverUserId = body.receiverUserId;
      const v_messageId = body.messageId;
      let checkChatEmpty = false;

      const chat = await ChatModel.findOne({
        $or: [
          {
            $and: [{ user1Id: v_senderUserId }, { user2Id: v_receiverUserId }],
          },
          {
            $and: [{ user1Id: receiverUserId }, { user2Id: senderUserId }],
          },
        ],
      });

      const chatMsgDelete = await Chat.findById(chat._id);
      await chatMsgDelete.user1MessageId.pull({ _id: messageId });
      await chatMsgDelete.user2MessageId.pull({ _id: messageId });
      await chatMsgDelete.save();

      await Message.findByIdAndRemove({ _id: messageId });

      // delete chat if there is no message (begin)
      let checkChat = await Chat.findById(chat._id)
        .populate("user1MessageId")
        .populate("user2MessageId");

      if (
        checkChat.user1MessageId[0] == null &&
        checkChat.user2MessageId[0] == null
      ) {
        await Chat.findByIdAndRemove({ _id: chat._id });
        checkChatEmpty = true;
      }
      // delete chat if there is no message (end)

      res.status(200).json({
        checkChatEmpty,
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        error,
        status: "fail",
      });
    }
  }
}

module.exports = MessageService;

const { successResponse, errorResponse } = require("../utils/response");
const ChatService = require("../services/chatService")

class ChatController {

    static async getChat(req, res) {
        try {
            const { body } = req;
            const result = await ChatService.getChat(body);
            if (result.statusCode == 404)
                return errorResponse(res, result.statusCode, result.message);
            logger.info(
                `User logged in successfully with email: ${JSON.stringify(result)}`
            );
            return successResponse(res, 200, "User logged in successfully", result);
        } catch (error) {
            logger.error(
                `Error in logging in user: ${JSON.stringify(error.message)}`
            );
            return errorResponse(res, 500, "Oops! Something went wrong");
        }
    }

    static async getChatDetail(req, res) {
        try {
            const { body } = req;
            const result = await ChatService.getChatDetail(body);
            if (result.statusCode == 404)
                return errorResponse(res, result.statusCode, result.message);
            logger.info(
                `User logged in successfully with email: ${JSON.stringify(result)}`
            );
            return successResponse(res, 200, "User logged in successfully", result);
        } catch (error) {
            logger.error(
                `Error in logging in user: ${JSON.stringify(error.message)}`
            );
            return errorResponse(res, 500, "Oops! Something went wrong");
        }
    }

    static async checkChatExist(req, res) {
        try {
            const { body } = req;
            const result = await ChatService.checkChatExist(body);
            if (result.statusCode == 404)
                return errorResponse(res, result.statusCode, result.message);
            logger.info(
                `User logged in successfully with email: ${JSON.stringify(result)}`
            );
            return successResponse(res, 200, "User logged in successfully", result);
        } catch (error) {
            logger.error(
                `Error in logging in user: ${JSON.stringify(error.message)}`
            );
            return errorResponse(res, 500, "Oops! Something went wrong");
        }
    }

    static async searchInChat(req, res) {
        try {
            const { body } = req;
            const result = await ChatService.searchInChat(body);
            if (result.statusCode == 404)
                return errorResponse(res, result.statusCode, result.message);
            logger.info(
                `User logged in successfully with email: ${JSON.stringify(result)}`
            );
            return
            successResponse(res, 200, "User logged in successfully", result);
        } catch (error) {
            logger.error(
                `Error in logging in user: ${JSON.stringify(error.message)}`
            );
            return errorResponse(res, 500, "Oops! Something went wrong");
        }

    }
}


module.exports = ChatController;
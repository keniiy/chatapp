const MessageService = require("../services/messageService");
const { successResponse, errorResponse } = require("../utils/response");

class MessageController {
  static async sendMessage(req, res) {
    try {
      const { body } = req;
      const result = await MessageService.sendMessage(body);
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

  static async deleteMessage(req, res) {
    try {
      const { body } = req;
      const result = await MessageService.deleteMessage(body);
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
}
module.exports = MessageController;

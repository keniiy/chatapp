const PageService = require("../services/pageService");
const { successResponse, errorResponse } = require("../utils/response");

class PageController {
  static async getIndexPage(req, res) {
    try {
      const { body } = req;
      const result = await PageService.getIndexPage(body);
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

module.exports = PageController;

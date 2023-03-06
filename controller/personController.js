const PersonService = require("../services/personService");
const { successResponse, errorResponse } = require("../utils/response");

class PersonController {
  static async createPerson(req, res) {
    try {
      const { body } = req;
      const result = await PersonService.createPerson(body);
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
  static async listPerson(req, res) {
    try {
      const { body } = req;
      const result = await PersonService.getPerson(body);
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

  static async deletePerson(req, res) {
    try {
      const { body } = req;
      const result = await PersonService.deletePerson(body);
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

module.exports = PersonController;

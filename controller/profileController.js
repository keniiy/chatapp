const profileService = require("../services/profileService");
const { successResponse, errorResponse } = require("../utils/response");

class ProfileController {
  static async getProfile(req, res) {
    try {
      const { body } = req;
      const result = await profileService.getProfile(body);
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

  static async getProfileDetail(req, res) {
    try {
      const { body } = req;
      const result = await profileService.getProfileDetail(body);
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

  static async checkProfileExist(req, res) {
    try {
      const { body } = req;
      const result = await profileService.checkProfileExist(body);
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

  static async searchInProfile(req, res) {
    try {
      const { body } = req;
      const result = await profileService.searchInProfile(body);
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

  static async updateProfile(req, res) {
    try {
      const { body } = req;
      const result = await profileService.updateProfile(body);
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

  static async updateProfileDetail(req, res) {
    try {
      const { body } = req;
      const result = await profileService.updateProfileDetail(body);
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

  static async deleteProfile(req, res) {
    try {
      const { body } = req;
      const result = await profileService.deleteProfile(body);
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

  static async deleteProfileDetail(req, res) {
    try {
      const { body } = req;
      const result = await profileService.deleteProfileDetail(body);
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

module.exports = ProfileController;

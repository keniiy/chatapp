const UserModel = require("../models/User");
const { successResponse, errorResponse } = require("../utils/response");
const { validationResult } = require("express-validator");

class PageService {
  static async getIndexPage(data) {
    const user = await UserModel.findOne({
      _id: data.session.userId,
    });

    data.status(200).render("index", {
      myName: user.name,
      myEmail: user.email,
      myProfilePhoto: user.image,
    });
  }

  static async getLoginPage(data) {
    data.status(200).render("auth/login");
  }

  static async getRegisterPage(req, res) {
    res.status(200).render("auth/register");
  }
}

module.exports = PageService;

// exports.getLoginPage = (req, res) => {
//   res.status(200).render("auth/login");
// };

// exports.getRegisterPage = (req, res) => {
//   res.status(200).render("auth/register");
// };

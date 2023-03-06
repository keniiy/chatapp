const UserModel = require("../models/User");
const HelperFunctions = require("../utils/helper-functions");
const { successResponse, errorResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");
const Token = require("../utils/token");

/**
 * @description - This is a class that contains methods for user authentication and authorization.
 */

class AuthService {
  /**
   * @description - This method is used to signup a user
   * @param {object} userData - The user data
   * @returns {object} - Returns an object
   * @memberof UserService
   */
  static async signup(data) {
    const { email, username, password } = data;
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user)
      return {
        statusCode: 409,
        message: "User already exists",
      };

    const hashedPassword = HelperFunctions.hashPassword(password);
    const newUser = await UserModel.create({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    logger.info(`User created with email: ${email}`);
    // remove password from the response
    newUser.password = undefined;
    return {
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    };
  }

  /**
   * @description - This method is used to login a user
   * @param {object} userData - The user data
   * @returns {object} - Returns an object
   * @memberof UserService
   
   */
  static async login(data) {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });

    if (!user)
      return {
        statusCode: 404,
        message: "User does not exist",
      };

    const isPasswordValid = HelperFunctions.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: "Invalid password",
      };

    const accessToken = Token.generateToken(user);
    logger.info(`User logged in with email: ${email}`);
    user.password = undefined;
    return {
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        user,
        accessToken,
      },
    };
  }
}
module.exports = AuthService;

// const HelperFunction = require("../utils/helperFunction");
// const ApiResponse = require("../utils/response");
// const { validationResult } = require("express-validator");
// const UserModel = require("../models/User");
// const Token = require("../utils/token");

// exports.createUser = async (req, res) => {
//   try {
//     if (req.body.password !== req.body.confirmPassword) {
//       req.flash("error", "Password and Confirm Password must be same!");

//       res.status(400).redirect("/register");
//     } else {
//       const user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       res.status(201).redirect("/login");
//     }
//   } catch (error) {
//     const errors = validationResult(req);

//     for (let i = 0; i < errors.array().length; i++) {
//       req.flash("error", `${errors.array()[i].msg}`);
//     }

//     res.status(400).redirect("/register");
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, same) => {
//           if (same) {
//             req.session.userId = user._id;
//             res.status(200).redirect("/");
//           } else {
//             req.flash("error", "Your password is not correct!");
//             res.status(200).redirect("/login");
//           }
//         });
//       } else {
//         const errors = validationResult(req);

//         for (let k = 0; k < errors.array().length; k++) {
//           req.flash("error", `${errors.array()[k].msg}`);
//         }

//         if (errors.array().length === 0) req.flash("error", "User not exists!");

//         res.status(400).redirect("/login");
//       }
//     });
//   } catch (error) {
//     const errors = validationResult(req);

//     for (let i = 0; i < errors.array().length; i++) {
//       req.flash("error", `${errors.array()[i].msg}`);
//     }

//     req.status(400).redirect("/login");
//   }
// };

// exports.logoutUser = async (req, res) => {
//   try {
//     req.session.destroy(() => {
//       res.redirect("/login");
//     });
//   } catch (error) {
//     res.status(404).json({
//       error,
//       status: "fail",
//     });
//   }
// };

// const { application } = require("express");
// const express = require("express");
// const authController = require("../controllers/authController");
// const { body } = require("express-validator");
// const User = require("../models/User");

// const router = express.Router();

// router.route("/signup").post(
//   [
//     body("name").not().isEmpty().withMessage("Please enter your name."),

//     body("email")
//       .isEmail()
//       .withMessage("Please enter valid email.")
//       .custom((userEmail) => {
//         return User.findOne({
//           email: userEmail,
//         }).then((user) => {
//           if (user) {
//             return Promise.reject("Email is already exists!");
//           }
//         });
//       }),

//     body("password").not().isEmpty().withMessage("Please enter a password."),
//   ],

//   authController.createUser
// );

// router.route("/login").post(
//   [
//     body("email").not().isEmpty().withMessage("Please enter an email."),

//     body("password").not().isEmpty().withMessage("Please enter password."),
//   ],

//   authController.loginUser
// );

// router.route('/logout').get(authController.logoutUser);

// module.exports = router;

const express = require("express");

const router = express.Router();
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const AuthController = require("../controller/authController");
const { validate } = require("../validation/validatorClass");
const {
  createUserSchema,
  loginUserSchema,
} = require("../validation/schema/user");

router.post("/signup", validate(createUserSchema), AuthController.createUser);

router.post("/login", validate(loginUserSchema), AuthController.login);

// router.get("/logout", AuthController.logout);

module.exports = router;

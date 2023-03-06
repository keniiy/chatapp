const { application } = require("express");
const express = require("express");
const pageController = require("../services/pageService");
const authMiddleware = require("../middlewares/authMiddleware");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const router = express.Router();

router.route("/").get(authMiddleware, pageController.getIndexPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/register").get(pageController.getRegisterPage);

module.exports = router;

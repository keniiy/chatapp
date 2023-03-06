const { application } = require("express");
const express = require("express");
const chatController = require("../controller/chatController");
const { body } = require("express-validator");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const router = express.Router();

router.route("/").get(chatController.getChat);
router.route("/detail").post(chatController.getChatDetail);
router.route("/check-exist").post(chatController.checkChatExist);
router.route("/search").post(chatController.searchInChat);

module.exports = router;

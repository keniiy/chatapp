const { application } = require("express");
const express = require("express");
const messageController = require("../controller/messageController");
const { body } = require("express-validator");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const router = express.Router();

router.route("/send").post(messageController.sendMessage);
router.route("/delete").delete(messageController.deleteMessage);

module.exports = router;

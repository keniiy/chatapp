const { application } = require("express");
const express = require("express");
const profileController = require("../controller/profileController");
const { body } = require("express-validator");
const User = require("../models/User");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const router = express.Router();

router.route("/").get(profileController.getProfile);
router.route("/update").put(profileController.updateProfile);

module.exports = router;

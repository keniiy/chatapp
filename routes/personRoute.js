const { application } = require("express");
const express = require("express");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(15);

const PersonController = require("../controller/personController");

const router = express.Router();

router.route("/create").post(PersonController.createPerson);
router.route("/list").get(PersonController.listPerson);
router.route("/delete").delete(PersonController.deletePerson);

module.exports = router;

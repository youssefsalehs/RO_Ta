const express = require("express");
const logRouter = express.Router();
const logController = require("./log.controller.js");

logRouter.route("/").post(logController.createLog);

module.exports = logRouter;

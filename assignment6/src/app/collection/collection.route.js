const express = require("express");
const collectionRouter = express.Router();
const collectionController = require("./collection.controller");

collectionRouter.post("/books", collectionController.createBooks);
collectionRouter.post("/author", collectionController.createAuthors);
collectionRouter.post("/log/capped", collectionController.createLogsCapped);
collectionRouter.post("/book/index", collectionController.createBooksIndex);

module.exports = collectionRouter;

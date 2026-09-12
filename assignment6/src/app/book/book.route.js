const express = require("express");
const bookRouter = express.Router();
const bookController = require("./book.controller.js");

bookRouter.route("/").post(bookController.createBook);
bookRouter.route("/title").get(bookController.getBookByTitle);
bookRouter.route("/year").get(bookController.getBooksByYear);
bookRouter.route("/genre").get(bookController.getBooksByGenre);
bookRouter.route("/update-by-name").patch(bookController.updateBooksYear);
bookRouter.route("/batch").post(bookController.createManyBooks);
bookRouter.route("/skip-limit").get(bookController.getBooksSkipLimit);
bookRouter.route("/exclude-genres").get(bookController.getBooksExcludingGenres);
bookRouter.route("/before-year").delete(bookController.deleteBeforeYear);
bookRouter.get("/aggregate1", bookController.getAggregate1);
bookRouter.get("/aggregate2", bookController.getAggregate2);
bookRouter.get("/aggregate3", bookController.getAggregate3);
bookRouter.get("/aggregate4", bookController.getAggregate4);
module.exports = bookRouter;

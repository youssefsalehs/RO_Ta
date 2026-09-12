const { ObjectId } = require("mongodb");
const { findBookById } = require("../book/book.repository.js");
const logRepository = require("./log.repository.js");
const createLog = async (logData) => {
  if (!logData.action || !logData.book_id) {
    const error = new Error("log action and book id  are required");
    error.status = 400;
    throw error;
  }
  logData.book_id = new ObjectId(logData.book_id);
  const book = await findBookById(logData.book_id);
  if (!book) {
    const error = new Error("this book isn't found");
    error.status = 404;
    throw error;
  }
  const { acknowledged, insertedId } = await logRepository.createLog(logData);
  return { acknowledged, insertedId };
};

module.exports = { createLog };

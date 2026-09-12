const collectionService = require("./collection.service");

async function createBooks(req, res, next) {
  try {
    const result = await collectionService.createBooks();
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function createAuthors(req, res, next) {
  try {
    const authorData = { name: "George Orwell", nationality: "British" };
    const result = await collectionService.createAuthors(authorData);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function createLogsCapped(req, res, next) {
  try {
    const result = await collectionService.createLogsCapped();
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function createBooksIndex(req, res, next) {
  try {
    const result = await collectionService.createBooksIndex();
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createAuthors,
  createBooksIndex,
  createLogsCapped,
  createBooks,
};

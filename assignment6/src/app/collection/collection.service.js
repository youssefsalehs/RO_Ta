const collectionRepository = require("./collection.repository");

async function createBooks() {
  return await collectionRepository.createBooksCollection();
}

async function createAuthors(authorData) {
  return await collectionRepository.insertAuthor(authorData);
}

async function createLogsCapped() {
  return await collectionRepository.createCappedLogsCollection();
}

async function createBooksIndex() {
  return await collectionRepository.createBookTitleIndex();
}

module.exports = {
  createBooks,
  createAuthors,
  createBooksIndex,
  createLogsCapped,
};

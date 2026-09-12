const bookRepository = require("./book.repository.js");

const createBook = async (bookData) => {
  if (!bookData.title) {
    const error = new Error("title is required");
    error.status = 400;
    throw error;
  }
  const { acknowledged, insertedId } =
    await bookRepository.createBook(bookData);
  return { acknowledged, insertedId };
};
const createManyBooks = async (books) => {
  if (books.length < 3) {
    const error = new Error("at least three books are required");

    error.status = 400;
    throw error;
  }
  const condition = books.every((book) => book.title);
  if (!condition) {
    const error = new Error("title is required in one of the books");

    error.status = 400;
    throw error;
  }

  const { acknowledged, insertedIds } =
    await bookRepository.createManyBooks(books);
  return { acknowledged, insertedIds };
};
const updateBooksYear = async ({ title, year }) => {
  if (!title || !year) {
    const error = new Error("title and year are required");
    error.status = 400;
    throw error;
  }
  const { acknowledged, modifiedCount, matchedCount } =
    await bookRepository.updateBooksYear({
      title,
      year,
    });
  return { acknowledged, modifiedCount, matchedCount };
};
const getBookByTitle = async (title) => {
  if (!title) {
    const error = new Error("title is  required");
    error.status = 400;
    throw error;
  }
  const book = await bookRepository.findBookByTitle({
    title,
  });
  return book;
};
const getBooksByYear = async ({ from, to }) => {
  if (!from && !to) {
    const error = new Error("Years filter from or to is missing");
    error.status = 400;
    throw error;
  }
  const books = await bookRepository.findBooksByYear({
    from,
    to,
  });
  return books;
};
const getBooksByGenre = async (genre) => {
  if (!genre) {
    const error = new Error("genre filter  is missing");
    error.status = 400;
    throw error;
  }
  const books = await bookRepository.findBooksByGenre(genre);
  return books;
};
const getBooksSkipLimit = async ({ page, limit }) => {
  if (!page || !limit) {
    const error = new Error("pagination is required  ");
    error.status = 400;
    throw error;
  }
  const skip = (page - 1) * limit;
  const books = await bookRepository.findBooksWithSkipLimit({
    skip: +skip,
    limt: +limit,
  });
  return books;
};
const getBooksExcludingGenres = async (genres) => {
  if (genres.length == 0) {
    const error = new Error("at least one genre is required");
    error.status = 400;
    throw error;
  }

  const books = await bookRepository.findBooksExcludingGenres(genres);
  return books;
};
const deleteBeforeYear = async (year) => {
  if (!year) {
    const error = new Error("year param is required");
    error.status = 400;
    throw error;
  }

  const { acknowledged, deletedCount } =
    await bookRepository.deleteBooksByYear(year);
  return { acknowledged, deletedCount };
};
const getFilteredAndSortedBooks = async (year) => {
  return (await bookRepository.getBooksAfterSpecificYearSorted(year)).toArray();
};

const getProjectedBooksAfterSpecificYear = async (year) => {
  return await bookRepository.getBooksProjectedAfterSpecificYear(year);
};

const getUnwindGenreBooks = async () => {
  return await bookRepository.unwindBookGenres();
};

const getBooksWithLogs = async () => {
  return await bookRepository.getBooksWithLogs();
};
module.exports = {
  createBook,
  createManyBooks,
  updateBooksYear,
  getBookByTitle,
  getBooksByYear,
  getBooksByGenre,
  getBooksSkipLimit,
  getBooksExcludingGenres,
  deleteBeforeYear,
  getFilteredAndSortedBooks,
  getBooksWithLogs,
  getUnwindGenreBooks,
  getProjectedBooksAfterSpecificYear,
};

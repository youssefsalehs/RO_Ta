const bookService = require("./book.service.js");
const createBook = async (req, res, next) => {
  try {
    const { title, author, year, genres } = req.body;
    const { acknowledged, insertedId } = await bookService.createBook({
      title,
      author,
      year,
      genres,
    });
    return res.status(201).json({
      acknowledged,
      insertedId,
    });
  } catch (error) {
    return next(error);
  }
};
const createManyBooks = async (req, res, next) => {
  try {
    const books = req.body;
    const { acknowledged, insertedIds } =
      await bookService.createManyBooks(books);
    return res.status(201).json({
      acknowledged,
      insertedIds,
    });
  } catch (error) {
    return next(error);
  }
};
const updateBooksYear = async (req, res, next) => {
  try {
    const { title } = req.query;
    const { year } = req.body;
    const { acknowledged, modifiedCount, matchedCount } =
      await bookService.updateBooksYear({
        title,
        year,
      });
    return res.status(200).json({ acknowledged, modifiedCount, matchedCount });
  } catch (error) {
    return next(error);
  }
};
const getBookByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    const book = await bookService.getBookByTitle(title);
    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};
const getBooksByYear = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const books = await bookService.getBooksByYear({ from, to });
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};
const getBooksByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    const books = await bookService.getBooksByGenre(genre);
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};
const getBooksSkipLimit = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const books = await bookService.getBooksSkipLimit({ page, limit });
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};
const getBooksExcludingGenres = async (req, res, next) => {
  try {
    const { genres } = req.query;

    const excludeGenres = genres
      ? Array.isArray(genres)
        ? genres
        : genres.split(",").map((g) => g.trim())
      : [];
    const books = await bookService.getBooksExcludingGenres(excludeGenres);
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};
const deleteBeforeYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const { acknowledged, deletedCount } =
      await bookService.deleteBeforeYear(year);
    return res.status(200).json({ acknowledged, deletedCount });
  } catch (error) {
    return next(error);
  }
};
const getAggregate1 = async (req, res, next) => {
  try {
    const { year } = req.query;

    const books = await bookService.getFilteredAndSortedBooks(+year);
    res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
};

const getAggregate2 = async (req, res, next) => {
  try {
    const { year } = req.query;
    const books = await bookService.getProjectedBooksAfterSpecificYear(+year);
    res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
};

const getAggregate3 = async (req, res, next) => {
  try {
    const books = await bookService.getUnwindGenreBooks();
    res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
};

const getAggregate4 = async (req, res, next) => {
  try {
    const books = await bookService.getBooksWithLogs();
    res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
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
  getAggregate1,
  getAggregate2,
  getAggregate3,
  getAggregate4,
};

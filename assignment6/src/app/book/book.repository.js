const db = require("../../common/db/mongodb.js");

const createBook = async (bookData) => {
  const { acknowledged, insertedId } = await db
    .collection("books")
    .insertOne(bookData);
  return { acknowledged, insertedId };
};
const createManyBooks = async (books) => {
  const { acknowledged, insertedIds } = await db
    .collection("books")
    .insertMany(books);
  return { acknowledged, insertedIds };
};
const findBookById = async (bookId) => {
  const book = await db.collection("books").findOne({ _id: bookId });
  return book;
};
const updateBooksYear = async ({ title, year }) => {
  const { acknowledged, modifiedCount, matchedCount } = await db
    .collection("books")
    .updateMany({ title: title }, { $set: { year: year } });

  return { acknowledged, modifiedCount, matchedCount };
};
const findBookByTitle = async (title) => {
  const query = {
    title: {
      $exists: true,
      $ne: null,
      $regex: title.toString(),
      $options: "i",
    },
  };
  const book = await db.collection("books").findOne(query);
  return book;
};
const findBooksByYear = async ({ from, to }) => {
  const query = {
    year: {
      $exists: true,
      $ne: null,
      $gte: Number(from),
      $lte: Number(to),
    },
  };
  const book = await db.collection("books").find(query).toArray();
  return book;
};
const findBooksByGenre = async (genre) => {
  const cleanGenre = String(genre || "").trim();

  const query = {
    genres: {
      $exists: true,
      $ne: null,
      $in: [cleanGenre],
    },
  };

  const books = await db.collection("books").find(query).toArray();
  return books;
};
const findBooksWithSkipLimit = async ({ skip, limt }) => {
  const books = await db
    .collection("books")
    .find({})
    .sort({ year: -1 })
    .skip(skip)
    .limit(limt)
    .toArray();
  return books;
};
const findBooksExcludingGenres = async (genres) => {
  const books = await db
    .collection("books")
    .find({
      genres: { $exists: true, $ne: null, $nin: genres },
    })
    .toArray();

  return books;
};
const deleteBooksByYear = async (year) => {
  const { acknowledged, deletedCount } = await db
    .collection("books")
    .deleteMany({
      year: { $exists: true, $ne: null, $lt: +year },
    });

  return { acknowledged, deletedCount };
};
const getBooksAfterSpecificYearSorted = async (year) => {
  return await db
    .collection("books")
    .aggregate([{ $match: { year: { $gt: year } } }, { $sort: { year: -1 } }]);
};

const getBooksProjectedAfterSpecificYear = async (year) => {
  return await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: year } } },
      {
        $project: {
          title: 1,
          author: 1,
          year: 1,
          _id: 0,
        },
      },
    ])
    .toArray();
};

const unwindBookGenres = async () => {
  return await db
    .collection("books")
    .aggregate([{ $unwind: "$genres" }])
    .toArray();
};

const getBooksWithLogs = async () => {
  return await db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "book_id",
          as: "bookLogs",
        },
      },
    ])
    .toArray();
};
module.exports = {
  createBook,
  createManyBooks,
  findBookById,
  updateBooksYear,
  findBookByTitle,
  findBooksByYear,
  findBooksByGenre,
  findBooksWithSkipLimit,
  findBooksExcludingGenres,
  deleteBooksByYear,
  getBooksAfterSpecificYearSorted,
  getBooksProjectedAfterSpecificYear,
  unwindBookGenres,
  getBooksWithLogs,
};

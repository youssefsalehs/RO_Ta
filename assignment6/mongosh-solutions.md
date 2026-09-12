use bookstore;

// 1)
db.createCollection("books", {
validator: {
$jsonSchema: {
bsonType: "object",
required: ["title"],
properties: {
title: { bsonType: "string", minLength: 1, description: "must be a non-empty string" }
}
}
}
});

// 2)
db.authors.insertOne({ name: "George Orwell", country: "UK" });

// 3)
db.createCollection("logs", { capped: true, size: 1048576 });

// 4)
db.books.createIndex({ title: 1 });

// 5)
db.books.insertOne({
title: "1984", author: "George Orwell", year: 1949,
genres: ["Dystopian", "Science Fiction"]
});

// 6)
db.books.insertMany([
{ title: "Brave New World", author: "Aldous Huxley", year: 1932, genres: ["Dystopian", "Science Fiction"] },
{ title: "Future", author: "Jane Doe", year: 2019, genres: ["Science Fiction"] },
{ title: "The Shining", author: "Stephen King", year: 1977, genres: ["Horror"] },
{ title: "Dune", author: "Frank Herbert", year: 1965, genres: ["Science Fiction", "Adventure"] }
]);

// 7)
db.logs.insertOne({ level: "info", message: "Book added", bookTitle: "Future", timestamp: new Date() });

// 8)
db.books.updateOne({ title: "Future" }, { $set: { year: 2022 } });

// 9)
db.books.findOne({ title: "Brave New World" });

// 10)
db.books.find({ year: { $gte: 1990, $lte: 2010 } });

// 11)
db.books.find({ genres: "Science Fiction" });

// 12)
db.books.find().sort({ year: -1 }).skip(2).limit(3);

// 13)
db.books.find({ year: { $type: "int" } });

// 14)
db.books.find({ genres: { $nin: ["Horror", "Science Fiction"] } });

// 15)
db.books.deleteMany({ year: { $lt: 2000 } });

// 16) Aggregation: after 2000, sorted by year desc
db.books.aggregate([
{ $match: { year: { $gt: 2000 } } },
{ $sort: { year: -1 } }
]);

// 17)
db.books.aggregate([
{ $match: { year: { $gt: 2000 } } },
{ $project: { _id: 0, title: 1, author: 1, year: 1 } }
]);

// 18)
db.books.aggregate([
{ $unwind: "$genres" }
]);

// 19)
db.books.aggregate([
{
$lookup: {
from: "logs",
localField: "title",
foreignField: "bookTitle",
as: "relatedLogs"
}
}
]);

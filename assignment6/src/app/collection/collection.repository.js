const db = require("../../common/db/mongodb.js");

const createBooksCollection = async () => {
  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "must be a non-empty string and is required",
          },
        },
      },
    },
  });
  return { success: true, message: "Books collection created successfully" };
};

const insertAuthor = async (authorData) => {
  return await db.collection("authors").insertOne(authorData);
};

const createCappedLogsCollection = async () => {
  await db.createCollection("logs", {
    capped: true,
    size: 1048576,
  });
  return {
    success: true,
    message: "Capped logs collection created successfully",
  };
};

const createBookTitleIndex = async () => {
  const indexName = await db.collection("books").createIndex({ title: 1 });
  return { success: true, indexName };
};

module.exports = {
  createBookTitleIndex,
  createBooksCollection,
  createCappedLogsCollection,
  insertAuthor,
};

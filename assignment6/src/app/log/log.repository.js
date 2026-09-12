const db = require("../../common/db/mongodb.js");
const createLog = async (logData) => {
  const { acknowledged, insertedId } = await db
    .collection("logs")
    .insertOne(logData);
  return { acknowledged, insertedId };
};
module.exports = { createLog };

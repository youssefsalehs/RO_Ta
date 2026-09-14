const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const bookRouter = require("./src/app/book/book.route.js");
const logRouter = require("./src/app/log/log.route.js");
const collectionRouter = require("./src/app/collection/collection.route.js");
const app = express();

app.use(express.json());
app.use("/api/v1/collection", collectionRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/log", logRouter);
app.use((req, res) => {
  return res.status(404).json({
    message: "resource not found",
  });
});
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
});
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

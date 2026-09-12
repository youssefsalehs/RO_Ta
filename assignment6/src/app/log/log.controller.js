const logService = require("./log.service.js");
const createLog = async (req, res, next) => {
  try {
    const { book_id, action } = req.body;
    const { acknowledged, insertedId } = await logService.createLog({
      book_id,
      action,
    });
    return res.status(201).json({
      acknowledged,
      insertedId,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createLog };

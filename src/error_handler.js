const logger = require("@sustainers/logger");

module.exports = app => {
  app.use((err, _, res, next) => {
    if (res.headersSent) return next(err);
    logger.error("An error occured: ", { err, stack: err.stack });
    res.status(err.statusCode || 500).send(err);
  });
};

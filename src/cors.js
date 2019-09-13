const cors = require("cors");

module.exports = app => {
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST",
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
  );
  app.options("*", cors());
};

const bodyParser = require("body-parser");
const cors = require("./_cors");

module.exports = app => {
  cors(app);
  app.use(bodyParser.json());
};

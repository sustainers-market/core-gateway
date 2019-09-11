const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// const authenticate = require("@sustainers/authenticate");
// const validate = require("@sustainers/validate");
// const forward = require("@sustainers/forward");
const logger = require("@sustainers/logger");

app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use(bodyParser.json());
app.options("*", cors());

app.get("/", (req, res) => {
  logger.info("Request: ", {
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  res.send("🍌");
});

app.post("/create.service", (req, res) => {
  logger.info("Request: ", {
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  res.send({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  });
  //Makes sure the request should be respected.
  // //** easy */
  // authorize(req)
  //   //Makes sure the scopes of the token matches the scopes of the function.
  //   //** need a map for routes:scopes, easy to make static */
  //   .then(() => authenticate(req))
  //   //Makes sure the payload and headers are composed correctly.
  //   //** need a map for routes:validation hard */
  //   .then(() => validate(req))
  //   //Forward request to the correct internal service.
  //   .then(() => forward(req))
  //   //Send the response if all is good.
  //   .then(response => res.send(response))
  //   //Send the error if something went wrong along the way.
  //   .catch(e => res.status(e.statusCode).send(e));
});

module.exports = app;

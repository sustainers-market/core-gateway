const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const authorize = require("@sustainers/authorize");
const kms = require("@sustainers/kms");
const issueCommand = require("@sustainers/issue-command-js");
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

app.post("/command/:domain/:action", (req, res) => {
  logger.info("Request: ", {
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers
  });

  authorize({
    req,
    verifyFn: kms.verify,
    scopesLookupFn: principle => {
      return [];
    },
    domain: req.params.domain,
    requiresToken: false
  })
    .then(({ context }) =>
      issueCommand({
        action: params.action,
        domain: params.domain
      })
        .with(req.body.payload, req.body.header)
        .in(context)
    )
    .then(response => res.send(response))
    .catch(e => {
      logger.error("ee: ", { err });
      res.status(e.statusCode || 500).send(e);
    });
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
});

module.exports = app;

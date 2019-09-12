const express = require("express");
const app = express();

const authorize = require("@sustainers/authorize");
const validateCommand = require("@sustainers/validate-command");
const cleanCommand = require("@sustainers/clean-command");
const kms = require("@sustainers/kms");
const issueCommand = require("@sustainers/issue-command-js");
const logger = require("@sustainers/logger");

const middleware = require("./src/middleware");

middleware(app);

app.post("/command/:domain/:action", async (req, res) => {
  logger.info("Request: ", {
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers
  });

  const context = await authorize({
    req,
    verifyFn: kms.verify,
    scopesLookupFn: () => [],
    domain: req.params.domain,
    requiresToken: false
  });
  logger.info("context: ", { context });
  await validateCommand(req.body);
  await cleanCommand(req.body);
  const response = await issueCommand({
    action: req.params.action,
    domain: req.params.domain,
    service: process.env.SERVICE,
    network: process.env.NETWORK
  })
    .with(req.body.payload, req.body.header)
    .in(context);
  logger.info("response: ", { response });
  res.send(response);
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

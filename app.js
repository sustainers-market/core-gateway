const express = require("express");
const asyncHandler = require("express-async-handler");

const validateCommand = require("@sustainers/validate-command");
const cleanCommand = require("@sustainers/clean-command");
const issueCommand = require("@sustainers/issue-command-js");
const logger = require("@sustainers/logger");
const corsMiddleware = require("@sustainers/cors-middleware");
const expressMiddleware = require("@sustainers/express-middleware");
const authenticationMiddleware = require("@sustainers/authentication-middleware");
// const authorizationMiddleware = require("@sustainers/authorization-middleware");
const errorMiddleware = require("@sustainers/error-middleware");
const gcpToken = require("@sustainers/gcp-token");

const app = express();

const whitelist = [
  "127.0.0.1",
  "http://127.0.0.1:4200",
  "http://0.0.0.0:4200",
  "https://sustainers.market"
];

expressMiddleware(app);

corsMiddleware({ app, whitelist, credentials: true });

app.post(
  "/command/:domain/:action",
  authenticationMiddleware,
  // authorizationMiddleware,
  asyncHandler(async (req, res) => {
    logger.info("Request: ", {
      params: req.params,
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies
    });

    logger.info("context: ", { context: req.context });
    await validateCommand(req.body);
    await cleanCommand(req.body);

    const response = await issueCommand({
      action: req.params.action,
      domain: req.params.domain,
      service: process.env.SERVICE,
      network: process.env.NETWORK
    })
      .with({
        payload: req.body.payload,
        headers: req.body.headers,
        tokenFn: gcpToken
      })
      .in(req.context);

    logger.info("response: ", { response });
    res.send(response);
  })
);

app.post(
  "/create.service",
  asyncHandler((req, res) => {
    logger.info("Request: ", {
      host: req.hostname,
      params: req.params,
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies
    });

    res
      .cookie(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        {
          httpOnly: true,
          secure: process.env.NODE_ENV != "local"
        }
      )
      .send({ heY: "boi" });
  })
);

app.post("/token", (req, res) => {
  logger.info("Request: ", {
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers,
    cookies: req.cookies
  });
  res
    .cookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      { maxAge: 86400, httpOnly: true, secure: true }
    )
    .send();
});

app.use(errorMiddleware);

module.exports = app;

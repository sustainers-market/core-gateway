const commandHandler = require("@sustainer-network/TODO=<some-command>-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");

exports.command = (req, res) => {
  commandHandler({
    params: req.body,
    tokens: tokensFromReq(req),
    publishEventFn: eventStore.add
  })
    .then(response => res.send(response))
    .catch(e => res.status(e.statusCode).send(e));
};

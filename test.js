const { fineTimestamp } = require("@sustainer-network/datetime");
const address =
  "https://TODO=<some-action>.TODO=<some-store>.core.staging.sustainer.network/v1/issue";

describe("TODO=<change this name, like `Change account email command`>", () => {
  it("should return successfully", async () => {
    const response = await post(address, {
      payload: {
        metadata: {
          TODO: "Write in sample input data",
          a: 1
        },
        permissions: [
          {
            root: "*",
            domain: "*",
            scope: "*"
          }
        ]
      },
      issuedTimestamp: fineTimestamp(),
      issuerInfo: {
        id: "asdf",
        ip: "asdf"
      }
    });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal({});
  });
  it("should return an error if incorrect params", async () => {
    const response = await post(address, {});
    expect(response.statusCode).to.be.at.least(400);
  });
});

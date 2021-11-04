const { fetchMyIP } = require("../iss");
const { assert } = require("chai");

describe("#fetchMyIP", () => {
  it("returns my IP address from the https://www.ipify.org/ API, via callback", (done) => {
    fetchMyIP((err, desc) => {
      // we expect no error for this scenario

      assert.equal(err, null);

      const expectedDesc = "50.92.242.56";

      // compare returned description
      assert.equal(expectedDesc, desc.trim());

      done();
    });
  });
});

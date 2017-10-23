var assert = require("assert");
require("../javascript.js");
var fetch = require("node-fetch");

describe("Converting Kelvins to Fahrenhet", function() {
  describe("kelvinTemp(300)", function() {
    it("should return a string 80℉ if passed 300", function() {
      assert.equal("80℉", kToF(300));
    });
  });
});

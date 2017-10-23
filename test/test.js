var assert = chai.assert;
describe("Unit Tests!", function() {
  describe("kToF", function() {
    it("should convert positive integer Kelvin units To Fahrenheit", function() {
      assert.equal(kToF(300), "80℉");
    });
    it("should convert negative integer Kelvin units To Fahrenheit", function() {
      assert.equal(kToF(-50), "-549℉");
    });
    it("throw an error if no integers were passed into KTF", function() {
      assert.equal(kToF("sdfsdf"), "NaN℉");
    });
  });

  describe("kToC", function() {
    it("should convert convert positive integer Kelvin units To Celsius", function() {
      assert.equal(kToC(300), "26℃");
    });
    it("should convert convert negative integer Kelvin units To Celsius", function() {
      assert.equal(kToC(-30), "-303℃");
    });
    it("throw an error if no integers were passed into KTC", function() {
      assert.equal(kToF("sdfsdf"), "NaN℉");
    });
  });

  describe("capitalizeEachFirstLetterOfEachWord", function() {
    it("should capitalize the first letter of each word in the string when passed a string with all lowercase letters", function() {
      assert.equal(
        capitalizeEachFirstLetterOfEachWord(
          "my mother went to the mall to buy cheese"
        ),
        "My Mother Went To The Mall To Buy Cheese"
      );
    });
    it("should capitalize the first letter of each word in the string when passed a string with all uppercase letters and make the rest of the word lowercase", function() {
      assert.equal(
        capitalizeEachFirstLetterOfEachWord(
          "MY MOTHER WENT TO THE MALL TO BUY CHEESE"
        ),
        "My Mother Went To The Mall To Buy Cheese"
      );
    });
  });

  describe("displayToDom", function() {
    it("should display to the dom taking in the parameters id and a string", function() {
      assert.equal(displayToDom("test", "Barcelona"), "Barcelona");
    });
    it("should display to the dom taking with integers", function() {
      assert.equal(displayToDom("test", "1234"), "1234");
    });
  });

  describe("renderIconToDom", function() {
    it("should render the image html address taking in a parameter of the name of the IMG tag and the icon return from the api call", function() {
      assert.equal(
        renderIconToDom("icon", "01n"),
        "http://openweathermap.org/img/w/01n.png"
      );
    });
  });

  describe("checkIfForC", function() {
    it("should check the div id with the context of Fahrenheit and convert it to Celsius ", function() {
      checkIfForC("fType", kToF(300), kToC(300));
      assert.equal(document.getElementById("fType").innerHTML, "26℃");
    });
    it("should check the div id with the context of Celsius and convert it to Fahrenheit ", function() {
      checkIfForC("cType", kToF(300), kToC(300));
      assert.equal(document.getElementById("cType").innerHTML, "80℉");
    });
  });
});

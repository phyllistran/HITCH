_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
});

var assert = chai.assert;
var expect = chai.expect;

//--- your setup code goes here (i.e. create test instances of your Constructors)
var yumApiId = "1156f99c";
var yumApiKey = "7c651b3d3555de2b8dcb55eeaaaa4c97";
var weathApiKey = "ca0e8ae811d1e1410ebdf8d1a30fc26a";
var client = new DateClient(yumApiId, yumApiKey, weathApiKey);
//--- your setup code goes here

//--- your tests go here
describe("client", function() {
    describe("#Constructor()", function() {
        it("should create an object", function() {
            expect(typeof client).to.equal("object");
            expect(client instanceof DateClient).to.equal(true);
        })
    })
})

// an example test suite
describe("Array", function() {
        describe("#indexOf()", function() {
            it("should return -1 when the value is not present", function() {
                expect([1, 2, 3].indexOf(5)).to.equal(-1);
                expect([1, 2, 3].indexOf(0)).to.equal(-1);
            })
        })
    })
    //--- your tests go here

mocha.globals(["jQuery"]);
mocha.run();

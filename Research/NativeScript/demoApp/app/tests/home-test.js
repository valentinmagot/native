var reflect = require("reflect-metadata");
var component = require("../home/home-view-model");

describe("Home page unit test", function(){
    var homeComponent
    
    beforeEach(function() {
        homeComponent = new component.AppComponent();
    });

    it("Verify onItemTap function", function() {
        homeComponent.onItemTap("OTDS FAQ");
        console.log = jasmine.createSpy("log");
        expect(console.log).toEqual('Item with index: 2 tapped')
    });


});
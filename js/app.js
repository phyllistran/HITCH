window.onload = app;

// runs when the DOM is loaded
function app() {

    // load some scripts (uses promises :D)
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;

        var apiID = "1156f99c";
        var apiKEY = "7c651b3d3555de2b8dcb55eeaaaa4c97";
        var client = new YummlyClient(apiID, apiKEY);
    });
}
YummlyClient.prototype.pullAllActiveListings = function() {
    return $.getJSON(
        this.yummly_url
    ).then(function(data) {
        return data;
    });
};
YummlyClient.prototype.pullSingleListing = function(id) {
    var apiID = "1156f99c";
    var apiKEY = "7c651b3d3555de2b8dcb55eeaaaa4c97";
    var single_url = "http://api.yummly.com/v1/api/recipe/" + id + "?_app_id=" + apiID + "&_app_key=" + apiKEY;
    return $.getJSON(single_url).then(function(data) {
        return data;
    });
};

function YummlyClient(id, key) {
    //var searchParams = "Ahi-poke-352868";
    this.yummly_url = "http://api.yummly.com/v1/api/recipes?_app_id=" + id + "&_app_key=" + key + "&requirePictures=true";

    this.setupRouting();
}
YummlyClient.prototype.loadTemplate = function(name) {
    return $.get("./templates/" + name + ".html").then(function() {
        return arguments[0];
    });
};
YummlyClient.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#yummly");

    var bigHtmlString = data.matches.map(function(yummly) {
        return _.template(templateString, yummly);
    }).join('');
    grid.innerHTML = bigHtmlString;
};
YummlyClient.prototype.drawSingleListing = function(template, data) {
    var listing = data;
    var grid = document.querySelector("#yummly");
    var bigHtmlString = _.template(template, listing);
    grid.innerHTML = bigHtmlString;
};
YummlyClient.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("yummly"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);
        });
    });

    Path.map("#/yummly").to(function() {
        self.drawListings(self.listingHtml, self.latestData);
    });
    Path.map("#/yummly/:id").to(function() {
        $.when(
            self.loadTemplate("single-yummly"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        });
    });
    //Path.map("#/weather").to(function(){
    //    self.drawWeather(this.)
    //})
    Path.root("#/");
    Path.listen();
};
// where do i put this?
// 
// var array = document.getElementById("ingredientLines").split(",").join("<br>");
// document.getElementById("ingredientLines").innerHTML = array;

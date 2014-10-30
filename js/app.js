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
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "yummlyPage";
};
YummlyClient.prototype.drawSingleListing = function(template, data) {
    var listing = data;
    var grid = document.querySelector("#yummly");
    var bigHtmlString = _.template(template, listing);
    grid.innerHTML = bigHtmlString;
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "coolColor";
    document.getElementById("clickMe").innerHTML = "";
};
YummlyClient.prototype.drawHomePage = function(template) {
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var home = document.querySelector("#home");
    home.innerHTML = template;
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "";
};
YummlyClient.prototype.drawWeatherPage = function(template) {
    var weather = document.querySelector("#weather");
    weather.innerHTML = template;
    var home = document.querySelector("#home");
    home.innerHTML = "";
    var food = document.querySelector("#yummly");
    food.innerHTML = "";
    var warmFood = document.querySelector("#warmFood");
    warmFood.innerHTML = "";
    var coldFood = document.querySelector("#coldFood");
    coldFood.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "weatherPage";
    document.getElementById("clickMe").innerHTML = "";
};
YummlyClient.prototype.drawMusicPage = function(template) {
    var music = document.querySelector("#music");
    music.innerHTML = template;
    var food = document.querySelector("#yummly");
    food.innerHTML = "";
    var warmFood = document.querySelector("#warmFood");
    warmFood.innerHTML = "";
    var coldFood = document.querySelector("#coldFood");
    coldFood.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "musicBackground musicPage";
    document.getElementById("clickMe").innerHTML = "";

};
YummlyClient.prototype.drawColdFoodPage = function(template) {
    var warmFood = document.querySelector("#warmFood");
    warmFood.innerHTML = template;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "coldFoodPage";
};
YummlyClient.prototype.drawWarmFoodPage = function(template) {
    var coldFood = document.querySelector("#coldFood");
    coldFood.innerHTML = template;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "warmFoodPage";
};
YummlyClient.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("home")
        ).then(function() {
            self.drawHomePage(arguments[0]);
        });
    });
    Path.map("#/yummly").to(function() {
        $.when(
            self.loadTemplate("yummly"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);
            var a = document.querySelectorAll("span");
            for (var i = 0, array = ""; i < a.length; i++) {
                array = a[i].innerHTML.split(",").join("<br>");
                a[i].innerHTML = array;
            }
            document.getElementById("clickMe").innerHTML = "Click a food block to see more info";
        });
    });
    Path.map("#/yummly/:id").to(function() {
        $.when(
            self.loadTemplate("single-yummly"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
            var array = document.getElementById("ingredientLines").innerHTML.split(",").join("<br>");
            document.getElementById("ingredientLines").innerHTML = array;
        });
    });
    Path.map("#/weather").to(function() {
        $.when(
            self.loadTemplate("weather")
        ).then(function() {
            self.drawWeatherPage(arguments[0]);
        });
    });
    Path.map("#/music").to(function() {
        $.when(
            self.loadTemplate("music")
        ).then(function() {
            self.drawMusicPage(arguments[0]);
        });
    });
    Path.map("#/coldFood").to(function() {
        $.when(
            self.loadTemplate("coldFood")
        ).then(function() {
            self.drawColdFoodPage(arguments[0]);
        });
    });
    Path.map("#/warmFood").to(function() {
        $.when(
            self.loadTemplate("warmFood")
        ).then(function() {
            self.drawWarmFoodPage(arguments[0]);
        });
    });
    Path.root("#/");
    Path.listen();
};

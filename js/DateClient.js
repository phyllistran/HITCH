var worldYummlyUrl = "world";

function DateClient(yumId, yumKey, wetKey) {
    this.yummly_url = "http://api.yummly.com/v1/api/recipes?_app_id=" + yumId + "&_app_key=" + yumKey + "&requirePictures=true";
    this.weather_url = "https://api.forecast.io/forecast/" + wetKey + "/";
    this.testURL = "http://api.yummly.com/v1/api/recipes?_app_id=1156f99c&_app_key=7c651b3d3555de2b8dcb55eeaaaa4c97&allowedAllergy[]=394^Peanut-Free&allowedDiet[]=vegetarian&maxTotalTimeInSeconds=1800&q=oysters&requirePictures=true&maxResult=100";
    this.setupRouting();
}
DateClient.prototype.pullAllActiveListings = function() {
    return $.getJSON(
        this.testURL
    ).then(function(data) {
        return data;
    });
};
DateClient.prototype.pullSearchListings = function() {
    return $.getJSON(
        worldYummlyUrl
    ).then(function(data) {
        return data;
    });
};
DateClient.prototype.pullSingleListing = function(id) {
    var yumApiId = "1156f99c";
    var yumApiKey = "7c651b3d3555de2b8dcb55eeaaaa4c97";
    var single_url = "http://api.yummly.com/v1/api/recipe/" + id + "?_app_id=" + yumApiId + "&_app_key=" + yumApiKey;
    return $.getJSON(single_url).then(function(data) {
        return data;
    });
};
DateClient.prototype.loadTemplate = function(name) {
    return $.get("./templates/" + name + ".html").then(function() {
        return arguments[0];
    });
};
DateClient.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#yummly");

    var bigHtmlString = data.matches.map(function(yummly) {
        return _.template(templateString, yummly);
    }).join('');

    grid.innerHTML = bigHtmlString;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var yumForm = document.querySelector("#yumForm");
    yumForm.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "yummlyPage";
    document.getElementById("clickMe").innerHTML = "Click a food block to see more info";
};
DateClient.prototype.drawSingleListing = function(template, data) {
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
DateClient.prototype.drawHomePage = function(template) {
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var home = document.querySelector("#home");
    home.innerHTML = template;
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "";
};
DateClient.prototype.drawWeatherPage = function(template) {
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
    navigator.geolocation.getCurrentPosition(GetLocation);

    function GetLocation(location) {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        document.querySelector('.weather_container').innerHTML = '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=' + latitude + '&lon=' + longitude + '&color=#00aaff&font=Georgia"></iframe>';
    }
};
DateClient.prototype.drawYumForm = function(template, data) {
    var yumForm = document.querySelector("#yumForm");
    yumForm.innerHTML = template;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var yummly = document.querySelector("#yummly");
    yummly.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "lightBlue";
    document.getElementById("clickMe").innerHTML = "";
};
DateClient.prototype.drawMusicPage = function(template) {
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
DateClient.prototype.drawColdFoodPage = function(template) {
    var warmFood = document.querySelector("#warmFood");
    warmFood.innerHTML = template;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "coldFoodPage";
};
DateClient.prototype.drawWarmFoodPage = function(template) {
    var coldFood = document.querySelector("#coldFood");
    coldFood.innerHTML = template;
    var weather = document.querySelector("#weather");
    weather.innerHTML = "";
    var music = document.querySelector("#music");
    music.innerHTML = "";
    var backgroundImage = document.querySelector("body");
    backgroundImage.className = "warmFoodPage";
};
DateClient.prototype.setupRouting = function() {
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
            self.pullSearchListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);
            var a = document.querySelectorAll("span");
            for (var i = 0, array = ""; i < a.length; i++) {
                array = a[i].innerHTML.split(",").join("<br>");
                a[i].innerHTML = array;
            }
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
    Path.map("#/yumForm").to(function() {
        $.when(
            self.loadTemplate("yumForm")
        ).then(function() {
            self.drawYumForm(arguments[0]);
        });
    });
    Path.root("#/");
    Path.listen();
};
DateClient.prototype.search = function() {
    var yummly_url = "http://api.yummly.com/v1/api/recipes?_app_id=1156f99c&_app_key=7c651b3d3555de2b8dcb55eeaaaa4c97&requirePictures=true";
    var allergies = "";
    if (document.getElementById('allergies').value !== "") {
        allergies = document.getElementById('allergies').value;
        yummly_url += "&allowedAllergy[]=" + allergies;
    }
    var diet = "";
    if (document.getElementById('diet').value !== "") {
        diet = document.getElementById('diet').value;
        yummly_url += "&allowedDiet[]=" + diet;
    }
    var search = "";
    if (document.getElementById('search').value !== "") {
        search = document.getElementById('search').value;
        search = search.split(" ").join("+");
        yummly_url += "&q:" + search;
    }
    var time = "";
    if (document.getElementById('time').value !== "") {
        time = document.getElementById('time').value;
        yummly_url += "&maxTotalTimeInSeconds=" + (time * 60);
    }
    var results = document.getElementById('results').value;
    if (results === "") {
        results = 6;
    }
    yummly_url += "&maxResult=" + results;
    var ingredients = "";
    var s = document.getElementById("ingredients").value;
    if (s !== "") {
        if (/\s/.test(s)) {
            s = s.split(" ");
            for (var i = 0; i < s.length; i++) {
                yummly_url += "&allowedIngredient[]=" + s[i];
            }
        } else {
            yummly_url += "&allowedIngredient[]=" + s;
        }
    }
    worldYummlyUrl = yummly_url;
};

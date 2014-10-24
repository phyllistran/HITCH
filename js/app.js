window.onload = app();
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
        //var apiID = "1156f99c";
        //var apiKEY = "7c651b3d3555de2b8dcb55eeaaaa4c97";
        //var searchParams = "Ahi-poke-352868";
        //var url = "http://api.yummly.com/v1/api/recipe/" + searchParams + "?_app_id=" + apiID + "&_app_key=" + apiKEY;
        var apiKEY = "ca0e8ae811d1e1410ebdf8d1a30fc26a";
        var latitude = "29.746592";
        var longitude = "-95.350304";
        var url = "https://api.forecast.io/forecast/" + apiKEY + "/" + latitude + "," + longitude + "?callback=?";

        $.ge
        }

    })

}

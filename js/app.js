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
        var searchParams = "Ahi-poke-352868";
        var url = "http://api.yummly.com/v1/api/recipe/" + searchParams + "?_app_id=" + apiID + "&_app_key=" + apiKEY;
        //$.get(url).then(function(data) {
        //    drawProfile(data);
        //})

        // function drawProfile(data) {
        //     document.body.innerHTML = [
        //         '<h1>',
        //         data.ingredientLines,
        //         data.nutri
        //         '</h1>'
        //     ].join('')
        // }


    })

}

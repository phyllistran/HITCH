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
    }, {
        url: "./js/DateClient.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;

        var yumApiId = "1156f99c";
        var yumApiKey = "7c651b3d3555de2b8dcb55eeaaaa4c97";
        var weathApiKey = "ca0e8ae811d1e1410ebdf8d1a30fc26a";
        var client = new DateClient(yumApiId, yumApiKey, weathApiKey);
    });
}

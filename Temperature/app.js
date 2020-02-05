var express = require('express');
var path = require('path');
var Weather = require('openweather-apis');

var weatherData;



var app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("index");
});


app.get("/:state", function (req, res) {

    Weather.setLang('en');
    Weather.setAPPID('7caf376b2f1aa72a70d196e055e13c9e');
    Weather.setCity(req.params.state);
    // Weather.setZipCode(req.params.state);
    Weather.getAllWeather(function(err, info){
        weatherData = info;
        res.json(weatherData);
    });
});

app.use(function (req, res) {
    res.status(404).render("404");

});

app.listen(3000);



$(document).ready(function () {
    console.log("HELLO");
    var $h1 = $("h1");
    var $state = $("input[name='State']");

    var $name = $("h3[name='name']");
    var $temp = $("h4[name='temp']");
    var $humidity = $("h4[name='humidity']");
    var $pressure = $("h4[name='pressure']");
    var $desc = $("h4[name='desc']");


    $("form").on("submit", function (e) {
        e.preventDefault();
        $h1.text = "Loading...";
        $name.text("");
        $temp.text("");
        $humidity.text("");
        $pressure.text("");
        $desc.text("");

        $.ajax({
            url: "/" + $state.val(),
            datatype: "json"

        }).done(function (info) {
            console.log(info);
            if (info.cod == "200") {
                $name.text(info.name);
                $temp.text("Temperature: " + info.main.temp);
                $humidity.text("Humidity: " + info.main.humidity);
                $pressure.text("Pressure: " + info.main.pressure);
                $desc.text("Description: " + info.weather[0].description);
            } else {
                $name.text("Error. 404. City not found.");   
            }

        })
            .fail(function () {
                $name.text("Error. 404");
            });

    });

});

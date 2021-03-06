// Variables used for code 

var apiKey = "3c61d7e9d7a3c69caec4fbeae9a680b6";
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?APPID="+apiKey; 
var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?APPID="+apiKey;


// added the search bar functionality

$("#search-button").click(function(){
    var city = $("#search-value").val();
    localStorage.setItem("lastCity", city);
    $(".list-group").prepend($("<button>").addClass("list-group-item").text(city));
    displayCityInfo(city);
});


// Function to display the city's information

function displayCityInfo(city){
    setTodaysInfo(city);
    FiveDayForecast(city);
}

// Today's information

function setTodaysInfo(city) {
    $.ajax({
        "url": currentWeatherUrl+"&q="+city,
        "method": "GET"
    }).then(function(response){
        var today = $("#today");
        
        today.empty().append($("<h1>").append(response.name + " (" + moment().format("MM/DD/yyyy") + ")").append($("<img>").attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")));
        today.append($("<p>").text("Temperature: " + kelvinToFarenheit(response.main.temp) + " °F"));
        today.append($("<p>").text("Humidity: " + response.main.humidity + "%"));
        today.append($("<p>").text("Wind Speed: " + (response.wind.speed) + " MPH"));
        getUVIndex(response.coord.lat, response.coord.lon);
    });
}


// Function for the five day forecast

function FiveDayForecast(city){
    $("#forecastTitle").text("5-Day Forecast:");
    $.ajax({
        "url": fiveDayForecastUrl+"&q="+city,
        "method": "GET"
    }).then(function(response){
        var num = 1;
        for(var i = 4; i < response.list.length; i+=8) {
            var dayWeather = response.list[i];
            addForecastCard(dayWeather, num++);
        }
    });
}

// function to add the forecast card 

function addForecastCard(dayWeather, cardNum){
    var header = dayWeather.dt_txt.slice(0, 10);
    var card = $("#card"+cardNum).empty();
    card.addClass("card text-white bg-primary mb-3").css("max-width: 18rem");
    var cardHeader = $("<div>").addClass("card-header").text(header);
    var cardBody = $("<div>").addClass("card-body");
    var cardBodyTitle = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+dayWeather.weather[0].icon+".png");
    var tmpF = kelvinToFarenheit(dayWeather.main.temp);
    var cardBodyTemp = $("<p>").addClass("card-text").text("Temp: " + tmpF + " °F");
    var cardBodyHumidity = $("<p>").addClass("card-text").text("Humidity: " + dayWeather.main.humidity + "%");
    card.append(cardHeader);
    card.append(cardBody);
    cardBody.append(cardBodyTitle).append(cardBodyTemp).append(cardBodyHumidity);
}

// formula to convert Kelvin to Faranheit 

function kelvinToFarenheit(kelvin){
    return (((parseFloat(kelvin) - 273.15) * (9/5)) + 32).toFixed(2);
}


// setting local storage to store the last city that was searched. 

$(document).on("click", ".list-group-item", function(){
    var city = $(this).text();
    localStorage.setItem("lastCity", city);
    displayCityInfo(city);
});

// retrieve the last searched city 

var lastCity = localStorage.getItem("lastCity");
if(lastCity != undefined){
    displayCityInfo(lastCity);
}
var apiKey = "3c61d7e9d7a3c69caec4fbeae9a680b6";
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?APPID="+apiKey; 
var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?APPID="+apiKey;







  function tempConvertK2F(kelvin) {
    return (((parseFloat(kelvin) - 273.15) * (9 / 5)) + 32).toFixed(1);
}
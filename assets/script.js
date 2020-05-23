// Check history for prior city inpiuts
var cities = JSON.parse(localStorage.getItem("cities")) || [];

$("#citySubBtn").click(function (event) {
	event.preventDefault();
	cityInput = $("#cityInput").val().trim();
	cities.push(cityInput);
	localStorage.setItem("cities", JSON.stringify(cities));
	// Test Value
	// cityInput = "Austin";
	getCityInfo(cityInput);
});

cities[cities.length - 1];

function getCityInfo(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e35920d296823fcdbe837c34d4e022b1`,
		method: "GET",
	}).then(function (response) {
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&exclude=minutely,hourly&appid=e35920d296823fcdbe837c34d4e022b1`,
			method: "GET",
		}).then(function (response) {
			//DOM manipulation
			let tempF = Math.round((response.current.temp - 273.15) * 1.8 + 32);
			$("#temperature").text(tempF + " F");
			$("#humidity").text(response.current.humidity + " %");
			$("#windSpeed").text(response.current.wind_speed + " MPH");
			$("#uvIndex").text(response.current.uvi);
		});
	});
}

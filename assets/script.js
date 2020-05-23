// Check history for prior city inpiuts
var cities = JSON.parse(localStorage.getItem("cities")) || [];
// Listen for User submitted city
$("#citySubBtn").click(function (event) {
	event.preventDefault();
	cityInput = $("#cityInput").val().trim();
	cities.push(cityInput);
	// Store current City Value in History
	localStorage.setItem("cities", JSON.stringify(cities));
	// Call the APIs
	getCityInfo(cityInput);
});
// placeholder for For loop logic
cities[cities.length - 1];

function getCityInfo(city) {
	// Get the City Forecast based on City
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e35920d296823fcdbe837c34d4e022b1`,
		method: "GET",
	}).then(function (response) {
		// Get the Forecast based on cities Lat/Long
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&exclude=minutely,hourly&appid=e35920d296823fcdbe837c34d4e022b1`,
			method: "GET",
		}).then(function (response) {
			//DOM manipulation
			// Render Current ForeCast
			renderCurForeCast(response.current);
			// Placeholder for 5 day forecast
			$("body").append(`<div id="fivedayforecast" class="container"></div>`);
			// Render Five Day Forecast
			for (let i = 0; i < 5; i++) {
				// Add FiveDay Elements
				$("#fivedayforecast").append(
					`<div id="city-view${i}" class="col justify-content-md-center">
					<h2><span id="city${i}"></span> <span id="date${i}"></span></h2>
					<img id="weatherIcon${i}" src="" />
					<p>Temperature: <span id="temperature${i}"></span></p>
					<p>Humidity: <span id="humidity${i}"></span></p>
					<p>Wind Speed: <span id="windSpeed${i}"></span></p>
					<p>UV Index: <span id="uvIndex${i}"></span></p>
					</div>`
				);
				renderCurForeCast(response.daily, i);
			}

			function renderCurForeCast(current) {
				// ConvertTemp from Kelvin to Fahrenheit..
				let tempKelvin = current.temp || current.temp.max;
				let tempF = Math.round((tempKelvin - 273.15) * 1.8 + 32);
				// I tried a few things but no luck. Any thoughts?
				// $("#temperature" + `${i}`).text(tempF + " F");
				// $(`#temperature` + `${i}`).text(tempF + " F");
				$("#temperature" + i).text(tempF + " F");

				$("#temperature").text(tempF + " F");
				$("#humidity").text(current.humidity + " %");
				$("#windSpeed").text(current.wind_speed + " MPH");
				$("#uvIndex").text(current.uvi);
			}
			// function renderFutForeCast(daily) {
			// 	// ConvertTemp from Kelvin to Fahrenheit..
			// 	let tempF = Math.round((daily.temp.max - 273.15) * 1.8 + 32);
			// 	$("#temperature").text(tempF + " F");
			// 	$("#humidity").text(daily.humidity + " %");
			// 	$("#windSpeed").text(daily.wind_speed + " MPH");
			// 	$("#uvIndex").text(daily.uvi);
			// }
		});
	});
}

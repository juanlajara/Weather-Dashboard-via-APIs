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
//#region functions
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
			$("#city").text(city);
			$("#date").text(moment().format(" MM/DD/YYYY"));
			renderCurForeCast(response.current);
			// Placeholder for 5 day forecast
			$("body").append(`<div id="fivedayforecast" class="container"></div>`);
			$("#fivedayforecast").append(`<h2> Future 5 Day Forecast</h2>`);
			// Render Five Day Forecast
			for (let i = 0; i < 5; i++) {
				renderFutForeCast(response.daily[i], i);
			}

			function renderCurForeCast(current) {
				// Create Icon Based on Weather
				$("#weatherIcon").attr(
					"src",
					"https://openweathermap.org/img/wn/" +
						current.weather[0].icon +
						"@2x.png"
				);
				// ConvertTemp from Kelvin to Fahrenheit..
				let tempKelvin = current.temp;
				let tempF = Math.round((tempKelvin - 273.15) * 1.8 + 32);

				// Render Conditions to Page
				$("#temperature").text(tempF + " F");
				$("#humidity").text(current.humidity + " %");
				$("#windSpeed").text(current.wind_speed + " MPH");
				$("#uvIndex").text(current.uvi);
			}

			function renderFutForeCast(daily, index) {
				// ConvertTemp from Kelvin to Fahrenheit..
				let tempF = Math.round((daily.temp.max - 273.15) * 1.8 + 32);
				// Render 5 day Forecast, Date and Icons
				$("#fivedayforecast").append(
					`<div id="city-view${index}" class="col justify-content-md-center">
					<h2><span id="city${index}"></span> <span class="h5" id="date${index}">${moment()
						.add(index + 1, "days")
						.format(" MM/DD/YYYY")}</span></h2>
					<img id="weatherIcon${index}" src="https://openweathermap.org/img/wn/${
						daily.weather[0].icon
					}@2x.png" />
					<p>Temperature: <span id="temperature${index}">${tempF + " F"}</span></p>
					<p>Humidity: <span id="humidity${index}">${daily.humidity + " %"}</span></p>
					<p>Wind Speed: <span id="windSpeed${index}">${
						daily.wind_speed + " MPH"
					}</span></p>
					<p>UV Index: <span id="uvIndex${index}">${daily.uvi}</span></p>
					</div>`
				);
			}
		});
	});
}
//#endregion

// Check history for prior city inpiuts
var cities = JSON.parse(localStorage.getItem("cities")) || [];
if (cities != "") {
	getCityInfo(cities[0]);
	for (let i = 0; i < Math.min(cities.length, 3); i++) {
		// Render Last 3 Cities to User
		$("#searchHist").append(
			`<div class="col"><button type="button" class="btn cityHistBtn">${cities[i]}</button></div>`
		);
	}
	// Render prior searched cities
	$(".cityHistBtn").click(function (event) {
		event.preventDefault();
		getCityInfo($(this).text());
	});
}

// Listen for User submitted city
$("#citySubBtn").click(function (event) {
	event.preventDefault();
	cityInput = $("#cityInput").val().trim();
	cities.unshift(cityInput);
	// Store current City Value in History
	localStorage.setItem("cities", JSON.stringify(cities));

	// Call the APIs
	getCityInfo(cityInput);
});

//#region functions
function getCityInfo(cityVal) {
	// Render placeholder for Current Condtion Info
	$("#currentforecast").remove();
	$("#fivedayforecast").remove();
	$("#renderConditions").append(
		`<div id="currentforecast" class="container">
		<div id="city-view" class="col pt-3 justify-content-md-center">
		<h3>Current Conditions for <span id="city"></span> <span id="date"></span></h3>
		<img id="weatherIcon" src="" /><p>Temperature: <span id="temperature"></span></p>
		<p>Humidity: <span id="humidity"></span></p><p>Wind Speed: <span id="windSpeed"></span></p>
		<p>UV Index: <span id="uvIndex"></span></p>
		</div></div>`
	);
	// Get the City Forecast based on City
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&appid=e35920d296823fcdbe837c34d4e022b1`,
		method: "GET",
	}).then(function (response) {
		// Get the Forecast based on cities Lat/Long
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&exclude=minutely,hourly&appid=e35920d296823fcdbe837c34d4e022b1`,
			method: "GET",
		}).then(function (response) {
			//DOM manipulation
			// Render Current ForeCast
			$("#city").text(cityVal);

			renderCurForeCast(response.current);
			// Placeholder for 5 day forecast
			$("#currentforecast").append(
				`<div id="fivedayforecast" class="container"></div>`
			);
			$("#fivedayforecast").append(`<h3> Future 5 Day Forecast</h3>`);
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
				// Render Date & Conditions to Page
				$("#date").text(moment().format(" MM/DD/YYYY"));
				// ConvertTemp from Kelvin to Fahrenheit..
				let tempKelvin = current.temp;
				let tempF = Math.round((tempKelvin - 273.15) * 1.8 + 32);
				// Render Current Conditions
				$("#temperature").text(tempF + " F");
				$("#humidity").text(current.humidity + " %");
				$("#windSpeed").text(current.wind_speed + " MPH");
				$("#uvIndex").text(current.uvi);
				uvIndexVal = parseInt($("#uvIndex").text());
				// If Severe
				if (8 <= uvIndexVal) {
					$(uvIndex).addClass("bg-danger text-white");
				}
				// If Moderate
				else if (3 <= uvIndexVal && uvIndexVal < 8) {
					$(uvIndex).addClass("bg-warning text-dark");
				}
				// If Favorable
				else {
					$(uvIndex).addClass("bg-info text-white");
				}
			}

			function renderFutForeCast(daily, index) {
				// ConvertTemp from Kelvin to Fahrenheit..
				let tempF = Math.round((daily.temp.max - 273.15) * 1.8 + 32);
				// Render 5 day Forecast, Date and Icons
				$("#fivedayforecast").append(
					`<div id="city-view${index}" class="col justify-content-md-center">
					<h3><span id="city${index}"></span> <span class="h5" id="date${index}">${moment()
						.add(index + 1, "days")
						.format(" MM/DD/YYYY")}</span></h3>
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
				// Render UV Colors based Index Values
				var uvIndexId = "#uvIndex" + `${index}`;
				uvIndexVal = parseInt($(uvIndexId).text());
				// If Severe
				if (7 < uvIndexVal) {
					$(uvIndexId).addClass("bg-danger text-white");
				}
				// If Moderate
				else if (3 <= uvIndexVal && uvIndexVal < 8) {
					$(uvIndexId).addClass("bg-warning text-dark");
				}
				// If Favorable
				else {
					$(uvIndexId).addClass("bg-info text-white");
				}
			}
		});
	});
}
//#endregion

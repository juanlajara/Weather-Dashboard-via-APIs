// 1. Save cities array to local storage so that it persists through refresh
// 2. Create div for 5 day forecast
// 3. Create a div (module maybe?) for each of the next 5 days
//   - date
//   - temp
//   - humidity
// 4. Add UV index data plus corresponding color
// 5. Reformat
// var cityInput;

// If existing City in Local Storage else create Empty cities Variable
var cities = JSON.parse(localStorage.getItem("cities")) || [];

console.log(cities);

$("#citySubBtn").click(function (event) {
	event.preventDefault();
	cityInput = $("#cityInput").val();
	cities.push(cityInput);
	localStorage.setItem("cities", JSON.stringify(cities));
	// Test Value
	// cityInput = "Austin";
	getCityInfo(cityInput);
});

cities[cities.length - 1];

function getCityInfo(city) {
	$.ajax({
		url: `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e35920d296823fcdbe837c34d4e022b1`,
		method: "GET",
	}).then(function (response) {
		$.ajax({
			url: `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&exclude=minutely,hourly&appid=e35920d296823fcdbe837c34d4e022b1`,
			method: "GET",
		}).then(function (response) {
			//DOM manipulation
			console.log((cityTemp = response.list[0].main.temp));
		});
	});
}

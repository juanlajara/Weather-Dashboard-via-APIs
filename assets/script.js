// 1. Save cities array to local storage so that it persists through refresh
// 2. Create div for 5 day forecast
// 3. Create a div (module maybe?) for each of the next 5 days
//   - date
//   - temp
//   - humidity
// 4. Add UV index data plus corresponding color
// 5. Reformat
var cityInput;

$("#citySubBtn").click(function () {
	cityInput = $("#cityInput").val();
	// Test Value
	cityInput = "Austin";
});

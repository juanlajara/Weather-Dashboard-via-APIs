# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

- The URL of the deployed application.

- The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

---

© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.

<!-- Top -->
<h1 align='center'>Work Day Scheduler</h1>
<h2>💡 Project Overview</h2>
<p>Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.Using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. We will use `localStorage` to store any persistent data.
<a href='https://juanlajara.github.io/Day-Planner/' target='_blank'>Live Link</a>
</p>

<h2> ✨User Story</h2>

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

<h2>⚙️ List of Technologies Used</h2>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>BootStrap</li>
    <li>JavaScript</li>
    <li>Moment.js</li>
    <li>JQuery</li>
    <li>Font Awesome</li>

</ul>
<h2>📓 Contributor(s)</h2>

<h3>🔭 Dre Lajara</h3>

<ul>
    <li><a href='https://github.com/juanlajara/juanlajara.github.io' target='_blank'>GitHub</a></li>
    <li><a href='https://www.linkedin.com/in/juan-andres-lajara-179a8442' target='_blank'>LinkedIn</a></li>
    <li>juanlajara001@gmail.com</li>
</ul>
<h2>💡 Special Thanks</h2>
<ul>
    <li>Kevin Holder</li>
    <li>Ashley Lerma</li>
</ul>

<h2>⚓ Acceptance Criteria</h2>

- GIVEN I am using a daily planner to create a schedule
- WHEN I open the planner
- THEN the current day is displayed at the top of the calendar

- WHEN I scroll down
- THEN I am presented with timeblocks for standard business hours

- WHEN I view the timeblocks for that day
- THEN each timeblock is color coded to indicate whether it is in the past
  present, or future

- WHEN I click into a timeblock
- THEN I can enter an event

- WHEN I click the save button for that timeblock
- THEN the text for that event is saved in local storage

- WHEN I refresh the page
- THEN the saved events persist

<h2>🎉 The following animation demonstrates the application functionality:</h2>

![day planner demo](./Assets/05-third-party-apis-homework-demo.gif)

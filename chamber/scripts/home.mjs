import {
	getWeatherByCity,
	formatWeatherData,
	getForecastByCity,
	getArrayForecast,
	getMeanFromArrayForecast,
} from "./weather.mjs";
import { getDirectoriesFromFile } from "./directory.mjs";

getWeatherByCity("Manaus").then((data) => {
	const wData = formatWeatherData(data);
	document.getElementById("weather").innerHTML = `
      <img src="https://openweathermap.org/payload/api/media/file/${wData.weatherIcon}.png" alt="Weather Icon">
      <div>
      <p><b>${wData.temp}°F</b></p>
      		<p>${wData.weatherDescription}</p>
      		<p>Low: ${wData.tempMin}°F</p>
      		<p>High: ${wData.tempMax}°F</p>
      		<p>Humidity: ${wData.humidity}%</p>
      		<p>Sunrise: ${wData.sunrise}</p>
      		<p>Sunset: ${wData.sunset}</p>
      </div>
      	      `;
});

getForecastByCity("Manaus").then((data) => {
	const forecastData = getMeanFromArrayForecast(getArrayForecast(data));
	document.getElementById("forecast").innerHTML = forecastData
		.map(
			(day) =>
				`<div class="forecast-day"><p><b>${day.date}</b>: ${day.mean.toFixed(2)}°F </p></div>`,
		)
		.join("");
});

function getThreeRandom(array) {
	const shuffled = array.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, 3);
}

getDirectoriesFromFile().then((directories) => {
	const directoryList = document.getElementById("businesses");
	let finalString = "";
	const featured = directories.filter(
		(directory) =>
			directory.membershipLevel === "gold" ||
			directory.membershipLevel === "silver",
	);
	console.log(featured);
	getThreeRandom(featured).forEach((e) => {
		finalString += `
		<div class="business-card">
<h3>${e.companyName}</h3>
<p>${e.description}</p>
              <div class="flex">
<img src="${e.imageFile}" alt="${e.companyName}">
                <div>
                  <p><b>Phone:</b> +55 92 99999-9999</p>
                  <p><b>Email:</b> abc@teste.com</p>
                  <p><b>URL:</b> mybusiness.com</p>
                </div>
              </div>
            </div>
`;
	});
	if (directoryList) directoryList.innerHTML = finalString;
});

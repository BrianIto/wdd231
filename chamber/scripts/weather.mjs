const api_key = "07d23be1a56a219b5e18ecb9dea7792e";

/** @typedef {Object} CityData
 * @property {number} lat - The latitude of the city.
 * @property {number} lon - The longitude of the city.
 * @property {string} name - The name of the city.
 * @property {string} country - The country code of the city. // Eg: BR
 * @property {string} state - The state code of the city (if available).
 */
/**
 * Get the latitude and longitude of a city using the OpenWeatherMap API.
 * @param {string} city - The name of the city to get the latitude and longitude for.
 * @return {Promise<Array<CityData>>} A promise that resolves to an object containing the latitude and longitude of the city.
 */
async function getLatLong(city) {
	const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;
	const response = await fetch(URL);
	const data = await response.json();
	return data;
}

/**
 * Get the weather forecast for a given city and number of days using the OpenWeatherMap API.
 * @param {string} city - The name of the city to get the weather forecast for.
 * @param {number} steps - The number of days to get the weather forecast for (1-5).
 */
async function getForecastByCity(city, steps = 16) {
	const latLongData = await getLatLong(city);
	if (latLongData.length === 0) {
		throw new Error(`City "${city}" not found.`);
	}
	const { lat, lon } = latLongData[0];
	const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${steps}&units=imperial&appid=${api_key}`;
	const response = await fetch(URL);
	const data = await response.json();
	return data;
}

/**
 * Get the weather data for a given latitude and longitude using the OpenWeatherMap API.
 * @param {number} lat - The latitude of the location to get the weather data for.
 * @param {number} long - The longitude of the location to get the weather data for.
 * @return {Promise<Object>} A promise that resolves to an object containing the weather data for the given latitude and longitude.
 */
async function getWeather(lat, long) {
	const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${api_key}`;
	const response = await fetch(URL);
	const data = await response.json();
	return data;
}

/** @typedef {Object} SysData
 * @property {number} type - The type of the system (1 for sunrise/sunset, 2 for moonrise/moonset).
 * @property {number} id - The ID of the system.
 * @property {string} country - The country code of the system (Eg: BR).
 * @property {number} sunrise - The time of sunrise in Unix timestamp.
 * @property {number} sunset - The time of sunset in Unix timestamp.
 */

/**
 * @typedef {Object} Weather
 * @property {number} temp - The current temperature in Fahrenheit.
 * @property {number} feels_like - The "feels like" temperature in Fahrenheit.
 * @property {number} temp_min - The minimum temperature in Fahrenheit.
 * @property {number} temp_max - The maximum temperature in Fahrenheit.
 * @property {number} pressure - The atmospheric pressure in hPa.
 * @property {number} humidity - The humidity percentage.
 */

/**
 * @typedef {Object} WeatherDescription
 * @property {number} id - The ID of the weather condition.
 * @property {string} main - The main weather condition (e.g., "Clear", "Clouds", "Rain").
 * @property {string} description - A more detailed description of the weather condition (e.g., "clear sky", "light rain").
 * @property {string} icon - The icon code for the weather condition, which can be used to retrieve an icon image from OpenWeatherMap.
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} cod - The HTTP status code of the response.
 * @property {string} name - The name of the neighborhood/city.
 * @property {Weather} main - An object containing the weather data for the location.
 * @property {SysData} sys - An object containing the system data for the location.
 * @property {Array<WeatherDescription>} weather - An array of objects containing the weather description for the location.
 */

/**
 * Get the weather data for a given city using the OpenWeatherMap API.
 * @param {string} city - The name of the city to get the weather data for.
 * @return {Promise<WeatherData>} A promise that resolves to an object containing the weather data for the given city.
 */
async function getWeatherByCity(city) {
	const latLongData = await getLatLong(city);
	if (latLongData.length === 0) {
		throw new Error(`City "${city}" not found.`);
	}
	const { lat, lon } = latLongData[0];
	const weatherData = await getWeather(lat, lon);
	return weatherData;
}

/**
 * Format the weather data for a given city into a human-readable string.
 * @param {WeatherData} weatherData - The weather data to format.
 * @return {Object} An object containing the formatted weather data for the given city.
 */
function formatWeatherData(weatherData) {
	const { name, main, sys, weather } = weatherData;
	const weatherDescription = weather[0]
		? weather[0].description
		: "unknown";
	const weatherIcon = weather[0] ? weather[0].icon : "unknown";
	const temp = main.temp;
	const feelsLike = main.feels_like;
	const tempMin = main.temp_min;
	const tempMax = main.temp_max;
	const pressure = main.pressure;
	const humidity = main.humidity;
	const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
	const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
	return {
		name,
		weatherDescription,
		weatherIcon,
		temp,
		feelsLike,
		tempMin,
		tempMax,
		pressure,
		humidity,
		sunrise,
		sunset,
	};
}

function getArrayForecast(forecastData) {
	const forecastArray = [];
	for (let i = 0; i < forecastData.list.length; i++) {
		const forecast = forecastData.list[i];
		const date = new Date(forecast.dt * 1000).toLocaleDateString();
		const temp = forecast.main.temp;
		forecastArray.push({ date, temp });
	}
	return forecastArray;
}

function getMeanFromArrayForecast(forecastArray) {
	const valuesByDate = {};
	forecastArray.forEach(({ date, temp }) => {
		if (!valuesByDate[date]) {
			valuesByDate[date] = [];
		} else {
			valuesByDate[date].push(temp);
		}
	});
	const meanByDate = {};
	for (const date in valuesByDate) {
		const values = valuesByDate[date];
		const mean =
			values.reduce((sum, value) => sum + value, 0) /
			values.length;
		meanByDate[date] = mean;
	}
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return Object.entries(meanByDate).map(([date, mean]) => ({
		date:
			date === new Date().toLocaleDateString()
				? "Today"
				: days[new Date(date).getDay()],
		mean,
	}));
}

export {
	getWeatherByCity,
	formatWeatherData,
	getForecastByCity,
	getArrayForecast,
	getMeanFromArrayForecast,
};

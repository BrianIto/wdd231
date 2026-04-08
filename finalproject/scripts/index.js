const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

// Menu Toggle
menu.addEventListener("click", () => {
	navigation.classList.toggle("open");
});

// Last Modified
const lastModified = document.querySelector("#last-modified");
const date = new Date(document.lastModified);
lastModified.innerHTML = date;

// =====================
//
// Fetch the Data
//
// =====================

const requestURL = "data/games.json";

/** @typedef {Object} Game
 * @property {string} name
 * @property {string} year
 * @property {string} description
 * @property {string} tag
 * @property {number} rating
 * @property {string} image_url
 */

/** @type {Game[]} */
let data = [];

function getRandomThree(data) {
	const randomThree = [];
	while (randomThree.length < 3) {
		const randomIndex = Math.floor(Math.random() * data.length);
		const randomGame = data[randomIndex];
		if (!randomThree.includes(randomGame)) {
			randomThree.push(randomGame);
		}
	}
	return randomThree;
}

/**
 * Fetches the game catalog from the specified URL and returns it as a JSON object.
 * @returns {Promise<Game[]>} A promise that resolves to an array of Game objects.
 */
async function fetchCatalog() {
	return fetch(requestURL).then((response) => response.json());
}

/**
 * @param {string} name
 * @param {string} description
 * @param {number} Rating
 */
function populateCard(name, description, rating, tag) {
	return `
			<div>
				<h3>${name}</h3>
				<p>${description}</p>
				<p>Rating: ${rating}</p>
				<div class="tag">${tag}</div>
				</div>
			`;
}

fetchCatalog().then(function (json) {
	data = json;
	/** @type {Game[]} */
	let random = getRandomThree(data);
	const container = document.querySelector(".preview");
	random.forEach((game) => {
		const card = document.createElement("div");
		card.classList.add("catalog-el");
		card.innerHTML = populateCard(
			game.name,
			game.description,
			game.rating,
			game.tag,
		);
		container.appendChild(card);
	});
});

export { fetchCatalog, populateCard };

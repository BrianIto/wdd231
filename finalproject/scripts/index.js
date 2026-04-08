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

fetch(requestURL)
	.then(function (response) {
		return response.json();
	})
	.then(function (json) {
		data = json;
		let random = getRandomThree(data);
		const container = document.querySelector(".preview");
		random.forEach((game) => {
			const card = document.createElement("div");
			card.classList.add("catalog-el");
			card.innerHTML = `
			<div>
				<h3>${game.name}</h3>
				<p>${game.description}</p>
				<p>Rating: ${game.rating}</p>
				</div>
			`;
			container.appendChild(card);
		});
	});

import { data } from "../data/areas.mjs";

/**
 * @typedef {Object} Area
 * @property {string} name - The name of the area
 * @property {string} address - The address of the areas
 * @property {string} img - The image of the area
 * @property {string} description - The description of the Areas
 */

/**
 *  @type {Array<Area>}
 */
const discoverAreas = data;

/**
 * @type {HTMLElement}
 **/
const contentElement = document.getElementById("content");

/**
 * Creates the card element
 * @param {Area} area - The area to create the card for
 * @returns {HTMLElement} The card element
 */
const generateCardElement = (area) => {
	return `
    	<div class="card">
		<h2>${area.name}</h2>
		<img src="${area.img}" alt="${area.name}">
		<p>${area.address}</p>
		<p>${area.description}</p>
	</div>
`;
};

/**
 * Generates all the cards for the Areas
 * @param {Array<Area>} areas - The areas to generate the cards for
 * @return {string} The HTML string of all the cards
 */
const generateAllCards = (areas) => {
	return areas.map((area) => generateCardElement(area)).join("");
};
contentElement.innerHTML = `<div class="grid-area">${generateAllCards(discoverAreas)}</div>`;

import { fetchCatalog, populateCard } from "./index.js";

const params = new URLSearchParams(window.location.search);

const search = params.get("search");

fetchCatalog().then(function (json) {
	const data = json;
	const catalog = document.getElementById("catalog");
	data.filter((el) => {
		return (
			el.name
				.toLowerCase()
				.includes(search?.toLowerCase() ?? "") ||
			el.description
				.toLowerCase()
				.includes(search?.toLowerCase() ?? "") ||
			el.tag
				.toLowerCase()
				.includes(search?.toLowerCase() ?? "")
		);
	}).forEach((game) => {
		const card = document.createElement("div");
		card.classList.add("catalog-el");
		card.innerHTML += populateCard(
			game.name,
			game.description,
			game.rating,
			game.tag,
		);
		catalog.appendChild(card);
	});
});

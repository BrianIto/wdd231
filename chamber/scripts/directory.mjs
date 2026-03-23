const lastModification = document.lastModified;
const lastModifiedElement = document.getElementById("last-modified");

lastModifiedElement.textContent = `Last Modified: ${lastModification}`;

export async function getDirectoriesFromFile() {
	const response = await fetch("data/members.json");
	const data = await response.json();
	return data;
}

getDirectoriesFromFile().then((directories) => {
	const directoryList = document.getElementById("directory-list");
	for (let directory of directories) {
		const listItem = document.createElement("div");
		const image = document.createElement("img");
		const name = document.createElement("h2");
		const address = document.createElement("p");
		const description = document.createElement("p");
		const phone = document.createElement("p");
		const website = document.createElement("a");

		image.src = directory.imageFile;
		image.loading = "lazy";
		image.alt = `${directory.companyName} logo`;
		name.textContent = directory.companyName;
		address.textContent = `Address: ${directory.address}`;
		description.textContent = directory.description;
		phone.textContent = `Phone: ${directory.phone}`;
		website.textContent = "Website";
		website.href = directory.website;

		listItem.appendChild(image);
		listItem.appendChild(name);
		listItem.appendChild(description);
		listItem.appendChild(address);
		listItem.appendChild(phone);
		listItem.appendChild(website);
		if (directoryList) directoryList.appendChild(listItem);
	}
});

const listButton = document.getElementById("list-view");
const gridButton = document.getElementById("grid-view");

// Initial grid-view
if (gridButton) gridButton.setAttribute("disabled", "true");
if (listButton) listButton.removeAttribute("disabled");

if (listButton) {
	listButton.addEventListener("click", () => {
		document.getElementById("directory-list").classList.add(
			"list-view",
		);
		listButton.setAttribute("disabled", "true");
		gridButton.removeAttribute("disabled");
	});
}

if (gridButton) {
	gridButton.addEventListener("click", () => {
		document.getElementById("directory-list").classList.remove(
			"list-view",
		);
		gridButton.setAttribute("disabled", "true");
		listButton.removeAttribute("disabled");
	});
}

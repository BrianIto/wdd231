async function getDirectoriesFromFile() {
	const response = await fetch("/scripts/members.json");
	const data = await response.json();
	console.log(data);
	return data;
}

getDirectoriesFromFile().then((directories) => {
	const directoryList = document.getElementById("directory-list");
	directories.forEach((directory) => {
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		link.href = directory.url;
		link.textContent = directory.name;
		listItem.appendChild(link);
		directoryList.appendChild(listItem);
	});
});

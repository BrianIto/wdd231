function getFormParams() {
	const params = new URLSearchParams(window.location.search);

	const formFields = [
		"first_name",
		"last_name",
		"email",
		"phone",
		"business",
		"organization_title",
		"level",
		"description",
		"timestamp",
	];

	const result = {};
	formFields.forEach((field) => {
		result[field] = params.get(field) || "";
	});

	return result;
}

const readableStrings = {
	first_name: "First Name",
	last_name: "Last Name",
	email: "Email",
	phone: "Phone",
	business: "Business",
	organization_title: "Organization Title",
	level: "Level",
	description: "Description",
	timestamp: "Timestamp",
};

document.getElementById("submitted-data").innerHTML = "";

const data = getFormParams();

const dataList = document.createElement("ul");
for (const [key, value] of Object.entries(data)) {
	const listItem = document.createElement("li");
	listItem.textContent = `${readableStrings[key]}: ${value}`;
	dataList.appendChild(listItem);
}

document.getElementById("submitted-data").appendChild(dataList);

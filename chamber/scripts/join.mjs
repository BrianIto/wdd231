document.getElementById("timestamp").value = Date.now();

let modalButtons = ["free-btn", "gold-btn", "silver-btn", "bronze-btn"];
let modalIds = ["free-modal", "gold-modal", "silver-modal", "bronze-modal"];

modalButtons.forEach((buttonId, index) => {
	document.getElementById(buttonId).addEventListener("click", () => {
		let modalElement = document.getElementById(modalIds[index]);
		modalElement.showModal();
	});
});

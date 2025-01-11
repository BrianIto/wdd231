let yearElement = document.querySelector("#year");
let lastModifiedElement = document.querySelector("#lastModified");

let today = new Date();
let lastModifiedDate = new Date(document.lastModified);

yearElement.innerHTML = today.getFullYear();

let formatter = new Intl.DateTimeFormat("en-US", { timeStyle: 'medium', dateStyle: "medium"});
lastModifiedElement.innerHTML = formatter.format(lastModifiedDate);

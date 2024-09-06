let baseUrl = "/WEB-PROJECT";

let closeBtn = document.querySelectorAll(".close-dialog-btn");
let mainContent = document.querySelector("#mainContent");

function closeDialog(dialog) {
	let form = dialog.querySelector("form");
	if (form) {
		form.reset();
	}
	dialog.animate([{ scale: 1 }, { scale: 0.5 }], 150, "ease-in-out").onfinish =
		function () {
			dialog.close();
		};
}

closeBtn.forEach((btn) => {
	btn.title = "Close";
	btn.addEventListener("click", function (e) {
		e.stopPropagation();
		//animate the dialog close
		let dialog = btn.parentElement;
		closeDialog(dialog);
	});
});

document.addEventListener("click", function (e) {
	if (e.target && e.target.matches("dialog")) {
		closeDialog(e.target);
	}
});

//close dialog on pressing escape key
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		let dialog = document.querySelectorAll("dialog[open]");
		if (dialog) {
			e.preventDefault();
			dialog.forEach((d) => {
				closeDialog(d);
			});
		}
	}
});

let dialog = document.querySelectorAll("dialog");
dialog.forEach((d) => {
	d.addEventListener("close", function (e) {
		closeDialog(d);
	});
});

document.addEventListener("change", function (e) {
	if (e.target && e.target.matches(".file-upload")) {
		let previewImage = e.target.nextElementSibling.nextElementSibling;
		console.log(previewImage);
		previewImage.src = URL.createObjectURL(e.target.files[0]);
		console.log(e.target.files[0]);
	}
});

function appendScript(src) {
	let dynamicScript = document.querySelector(".dynamic-script");
	dynamicScript.src = src;
}

function appendStyle(href) {
	let dynamicStyle = document.querySelector(".dynamic-css");
	dynamicStyle.href = href;
}

function reloadMainScript() {
	let mainScript = document.querySelector(".main-script");
	mainScript.src = "";
	setTimeout(() => {
		mainScript.src = baseUrl + "/public/JS/script.js";
	}, 1000);
}
//alrets

function showAlert(message, type) {
	let alertContainer = document.querySelector(".alert-container");
	let alert = document.createElement("div");
	let alertIcon = document.createElement("i");
	let alertMessage = document.createElement("p");
	let alertTextColor, alertBgColor, alertBorderColor;

	alert.classList.add("alert");
	alertIcon.classList.add("fa-solid");
	alertMessage.classList.add("alert-message");

	alert.appendChild(alertIcon);
	alert.appendChild(alertMessage);
	alertMessage.innerHTML = message;
	alertContainer.appendChild(alert);

	switch (type) {
		case "success":
			alertIcon.classList.add("fa-circle-check");
			alertTextColor = "#155724";
			alertBgColor = "#d4edda";
			alertBorderColor = "#c3e6cb";
			break;
		case "error":
			alertIcon.classList.add("fa-circle-xmark");
			alertTextColor = "#721c24";
			alertBgColor = "#f8d7da";
			alertBorderColor = "#f5c6cb";
			break;
		case "warning":
			alertIcon.classList.add("fa-circle-exclamation");
			alertTextColor = "#856404";
			alertBgColor = "#fff3cd";
			alertBorderColor = "#ffeeba";
			break;
		case "info":
			alertIcon.classList.add("fa-circle-info");
			alertTextColor = "#0c5460";
			alertBgColor = "#d1ecf1";
			alertBorderColor = "#bee5eb";
			break;
		default:
			console.error("Invalid alert type");
			break;
	}

	alert.style.color = alertTextColor;
	alert.style.backgroundColor = alertBgColor;
	alert.style.borderColor = alertBorderColor;

	showAlertAnimate(alert);

	setTimeout(() => {
		hideAlertAnimate(alert);
	}, 5000);
}

function showAlertAnimate(alert) {
	alert.animate(
		[
			{ width: "0%", opacity: 0 },
			{ width: "100%", opacity: 1 },
		],

		{ duration: 500, fill: "forwards" }
	);
}

function hideAlertAnimate(alert) {
	alert.animate(
		[
			{ width: "100%", opacity: 1 },
			{ width: "0%", opacity: 0 },
		],
		{ duration: 500, fill: "forwards" }
	);
	setTimeout(() => {
		alert.remove();
	}, 500);
}

function changeActiveBtn(btn) {
	let activeBtn = document.querySelector(".nav-links .active");
	btn = btn.parentElement;
	activeBtn.classList.remove("active");
	btn.classList.add("active");
}

let loadingProgress = document.querySelector("#loadingProgress");
function animateProgress(progress = 100) {
	loadingProgress.style.width = progress + "%";
}

let navBtns = document.querySelectorAll(".nav-btn");
let mainContentContainer = document.querySelector("#mainContent");

navBtns.forEach((btn) => {
	btn.addEventListener("click", async function () {
		changeActiveBtn(btn);
		animateProgress(60);
		await loadPage(btn.getAttribute("data-path"), mainContentContainer);
		animateProgress();
		playMusic();
	});
});

//function to change pages
async function loadPage(path, containerElement) {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const html = await response.text();
		containerElement.innerHTML = html;
		return true;
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
		return false;
	}
}

//all api calls

//function to fetch music
async function fetchMusic(musicId) {
	try {
		const response = await fetch(baseUrl + "/modules/fetchMusic.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `musicId=${encodeURIComponent(musicId)}`,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching music:", error);
		return {};
	}
}

//Function to like or dislike a music
async function setLikeStatus(musicId, status) {
	try {
		const response = await fetch(baseUrl + "/modules/addToFavourite.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `musicId=${encodeURIComponent(musicId)}&action=${status}`,
		});
		const data = await response.json();
		if (data.status === "success") {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error setting like status:", error);
		return false;
	}
}

//Function to add music to playlist
async function addToPlaylist(playlistId, musicId) {
	try {
		const response = await fetch(baseUrl + "/modules/addToPlaylist.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `playlistId=${encodeURIComponent(
				playlistId
			)}&musicId=${encodeURIComponent(musicId)}`,
		});
		const data = await response.json();
		if (data.status === "success") {
			return true;
		} else if (data.code === 403) {
			showAlert("Music is already in the playlist", "info");
			return false;
		} else {
			showAlert("Something went wrong! " + data.message, "error");
			return false;
		}
	} catch (error) {
		console.error("Error adding to playlist:", error);
		return false;
	}
}

//Function to create a playlist
async function createPlaylist(formData) {
	try {
		const response = await fetch(baseUrl + "/modules/createPlaylist.php", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		if (data.status === "success") {
			return true;
		} else {
			showAlert("Something went wrong! " + data.message, "error");
			return false;
		}
	} catch (error) {
		console.error("Error creating playlist:", error);
		return false;
	}
}

//Function to fetch a playlist html
async function fetchPlaylists() {
	try {
		const response = await fetch(baseUrl + "/modules/getPlaylist.php", {
			method: "POST",
		});
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Error fetching playlists:", error);
		return "";
	}
}

//Function to add to history
async function addToHistory(musicId) {
	try {
		const response = await fetch(baseUrl + "/modules/addToHistory.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `musicId=${encodeURIComponent(musicId)}`,
		});
		const data = await response.json();
		if (data.status === "success") {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error adding to history:", error);
		return false;
	}
}

async function checkLoginStatus() {
	try {
		const response = await fetch(baseUrl + "/modules/checkLoginStatus.php");
		const data = await response.json();
		if (data) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error checking login status:", error);
		return {};
	}
}

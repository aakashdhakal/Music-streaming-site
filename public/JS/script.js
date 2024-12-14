let title = document.title;

//function to load pages dynamically

async function loadPageDynamic(url) {
	setPagePreloader(true);
	let path = url.split("/").pop();
	history.pushState({ path: path }, null, url);
	//select nab-tn where data-url is equal to url
	let btn = document.querySelector(`#sideNav button[data-path="/${path}"]`);
	if (btn) changeActiveBtn(btn);
	document.title = getTitle(path);
	await loadPage(url);
}

function setPagePreloader(display) {
	let main = document.querySelector("main");
	if (display) {
		main.innerHTML = `<iconify-icon icon="svg-spinners:6-dots-rotate" width="60" height="60"  style="color: #ff7f11; position:absolute; left: 50%;top:50%;"></iconify-icon>`;
	}
}

function getTitle(path) {
	switch (path) {
		case "":
		case "home":
			return "Sangeet - The Heartbeat of Music";
		case "favourites":
			return "Sangeet - Favourites";
		case "history":
			return "Sangeet - History";
		case "discover":
			return "Sangeet - Discover";
		case "trending":
			return "Sangeet - Trending";
	}
}

//preloader

let preloader = document.querySelector(".preloader");
window.addEventListener("load", async () => {
	let url = window.location.href;
	await loadPageDynamic(url);
	setTimeout(() => {
		preloader.style.display = "none";
	}, 1000);
});

function showError(form, message) {
	let errorContainer = form.parentElement.previousElementSibling;
	errorContainer.style.display = "flex";
	let errorText = errorContainer.querySelector(".error-text");
	errorText.innerText = message;
}

function hideError() {
	let errorContainer = document.querySelectorAll(".error-container");
	errorContainer.forEach((container) => {
		container.style.display = "none";
	});
}

function setBtnStatus(btn, status, text) {
	switch (status) {
		case "loading":
			btn.innerHTML = `<iconify-icon icon="eos-icons:bubble-loading"></iconify-icon>&nbsp;&nbsp;${text}`;
			btn.disabled = true;
			btn.style.opacity = 0.7;
			break;
		case "normal":
			btn.innerHTML = `${text}`;
			btn.style.opacity = 1;
			break;
	}
}

// Close dialog function
function closeDialog(dialog) {
	let form = dialog.querySelector("form");
	if (form) form.reset();
	dialog.animate([{ scale: 1 }, { scale: 0.5 }], 150, "ease-in-out").onfinish =
		() => {
			dialog.close();
			hideError();
		};
}

// Event listeners for close buttons
document.querySelectorAll(".close-dialog-btn").forEach((btn) => {
	btn.title = "Close";
	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		closeDialog(btn.parentElement.parentElement);
	});
});

// Close dialog on Escape key press
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		e.preventDefault();
		document.querySelectorAll("dialog[open]").forEach(closeDialog);
	}
});

// Event listener for file upload preview
document.addEventListener("change", (e) => {
	if (e.target.matches(".file-upload")) {
		let previewImage = e.target.parentElement;
		let file = e.target.files[0];
		let imageUrl = URL.createObjectURL(file);
		previewImage.style.backgroundImage = `url(${imageUrl})`;
	}
});

// Append script dynamically
function appendScript(src) {
	let dynamicScript = document.querySelector(".dynamic-script");
	if (dynamicScript) document.body.removeChild(dynamicScript);
	let script = document.createElement("script");
	script.src = src;
	script.classList.add("dynamic-script");
	document.body.appendChild(script);
}

// Append style dynamically
function appendStyle(href) {
	let dynamicStyle = document.querySelector(".dynamic-css");
	if (dynamicStyle) dynamicStyle.href = href;
}

// Change active button
function changeActiveBtn(btn) {
	document.querySelector("#sideNav ul .active").classList.remove("active");
	btn.parentElement.classList.add("active");
}

// Event listeners for navigation buttons
document.querySelectorAll(".nav-btn").forEach((btn) => {
	btn.addEventListener("click", async () => {
		changeActiveBtn(btn);
		let path = btn.getAttribute("data-path");
		await loadPageDynamic(path);
		await appendScript(btn.getAttribute("data-script"));
	});
});

// Change theme function
async function changeTheme() {
	if (await checkLoginStatus()) {
		document.body.classList.toggle("dark");
		localStorage.setItem("darkMode", document.body.classList.contains("dark"));
		document.querySelector(".dark-mode-btn").innerHTML =
			document.body.classList.contains("dark")
				? `<iconify-icon icon="clarity:sun-line"></iconify-icon>`
				: `<iconify-icon icon="flowbite:moon-outline"></iconify-icon>`;
	}
}

// Sidebar collapse/expand
let sidebar = document.querySelector("#sideNav");
if (localStorage.getItem("sidebar") === "collapse")
	sidebar.classList.add("collapse");
document
	.querySelector("#collapseExpandSidebar")
	.addEventListener("click", () => {
		sidebar.classList.toggle("collapse");
		localStorage.setItem(
			"sidebar",
			sidebar.classList.contains("collapse") ? "collapse" : "expand",
		);
	});

// Dark mode toggle
if (localStorage.getItem("darkMode") === "true") changeTheme();

function toggleProfileWindow() {
	document
		.querySelector("#profileWindow")
		.classList.toggle("openProfileWindow");
}

// Notification handling
let notificationCount = 5;
setInterval(async () => {
	if (await checkLoginStatus()) showNotifications(notificationCount);
}, 10000);

function toggleNotificationWindow() {
	document
		.querySelector("#notificationWindow")
		.classList.toggle("openNotificationWindow");
}

// Show notifications
async function showNotifications(number) {
	let notifications = await fetchNotifications();
	let notificationBody = document.querySelector(".notification-body");
	notificationBody.innerHTML = "";
	if (notifications.status === 404) {
		notificationBody.innerHTML = `<div class="no-notifications"><iconify-icon icon="mynaui:bell-x"></iconify-icon><p>No new notifications</p></div>`;
		return;
	}
	notifications.slice(0, number).forEach((notification) => {
		let iconifyIcon =
			notification.subject === "like"
				? "fluent:thumb-like-16-filled"
				: "si:user-fill";
		let time = formatTime(notification.time);
		notificationBody.innerHTML += `<div class="notification-card" data-readStatus="${notification.read_status}" data-notificationId="${notification.id}"><div class="notification-info"><iconify-icon icon="${iconifyIcon}"></iconify-icon><div class="notification-details"><p class="notification-message">${notification.message}</p><p class="notification-time">${time}</p></div></div><button id="clearNotification"><iconify-icon icon="ic:outline-delete"></iconify-icon></button></div>`;
	});

	let unreadNotificationCount = document.querySelectorAll(
		".notification-card[data-readStatus='0']",
	).length;

	if (unreadNotificationCount > 0) {
		document
			.querySelector(".notification-btn")
			.style.setProperty("--unreadNotificationMark", "flex");
		document.title = "(" + unreadNotificationCount + ") " + title;
	} else {
		document
			.querySelector(".notification-btn")
			.style.setProperty("--unreadNotificationMark", "none");
		document.title = title;
	}
}

async function markAsRead(notificationId) {
	if (await setNotificationReadStatus(notificationId))
		showNotifications(notificationCount);
}

async function markAllAsRead() {
	let notifications = await fetchNotifications(-1);
	notifications.forEach(async (notification) => {
		if (notification.read_status === 0)
			await setNotificationReadStatus(notification.id);
	});
	showNotifications(notificationCount);
}

// Format time function
function formatTime(time) {
	const now = new Date();
	const date = new Date(time);
	const diff = Math.abs(now - date);
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	const diffWeeks = Math.floor(diffDays / 7);
	const diffYears = now.getFullYear() - date.getFullYear();
	const diffMonths = diffYears * 12 + now.getMonth() - date.getMonth();

	if (diffYears >= 1)
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	if (diffMonths >= 1)
		return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
	if (diffWeeks >= 1) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
	if (diffDays >= 1) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

	const diffHours = Math.floor(diff / (1000 * 60 * 60));
	const diffMinutes = Math.floor(diff / (1000 * 60));
	if (diffHours >= 1) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
}

function removeCustomSelectDropdown() {
	document.querySelectorAll(".custom-select").forEach((select) => {
		if (select.querySelector(".select-options").classList.contains("show")) {
			select.querySelector(".select-options").classList.remove("show");
		}
	});
}

document.addEventListener("click", (e) => {
	if (!e.target.closest("#notificationWindow, .notification-btn")) {
		document
			.querySelector("#notificationWindow")
			.classList.remove("openNotificationWindow");
	}
	if (
		e.target.matches(".notification-card *") &&
		!e.target.matches("#clearNotification *")
	) {
		let notificationCard = e.target.closest(".notification-card");
		if (notificationCard.getAttribute("data-readStatus") === "0") {
			markAsRead(notificationCard.getAttribute("data-notificationId"));
			notificationCard.setAttribute("data-readStatus", 1);
		}
	}
	if (e.target.matches("#clearNotification *")) {
		deleteNotification(
			e.target
				.closest(".notification-card")
				.getAttribute("data-notificationId"),
		);
		showNotifications(notificationCount);
	}
	if (!e.target.closest("#profileWindow, .profile-btn")) {
		document
			.querySelector("#profileWindow")
			.classList.remove("openProfileWindow");
	}
	if (e.target.closest(".notification-btn")) toggleNotificationWindow();
	if (e.target.closest("#seeAllNotifications")) showNotifications(-1);
	if (e.target.closest(".mark-all-as-read")) markAllAsRead();
	if (e.target.closest(".dark-mode-btn")) changeTheme();
	if (e.target.closest(".profile-btn")) toggleProfileWindow();
	if (e.target.closest(".toggle-password-visibility")) {
		let passwordField = e.target.previousElementSibling.previousElementSibling;
		passwordField.type =
			passwordField.type === "password" ? "text" : "password";
		e.target.innerHTML =
			passwordField.type === "password"
				? `<iconify-icon icon="fluent:eye-24-regular"></iconify-icon>`
				: `<iconify-icon icon="fluent:eye-off-20-regular"></iconify-icon>`;
	}
	if (e.target.closest(".custom-select")) {
		let select = e.target.closest(".custom-select");
		let selectOptions = select.querySelector(".select-options");
		selectOptions.classList.toggle("show");
	}
	if (!e.target.closest(".custom-select")) {
		removeCustomSelectDropdown();
	}
});

document.addEventListener("DOMContentLoaded", async () => {
	if (await checkLoginStatus()) showNotifications(notificationCount);
});

//all api calls

//function to change pages
async function loadPage(path) {
	let containerElement = document.querySelector("main");
	try {
		const response = await fetch(path, {
			method: "POST",
		});
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
//function to fetch music
async function fetchMusic(musicId) {
	try {
		const response = await fetch("/fetchmusic", {
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
async function setLikeStatus(musicId, action = "check") {
	try {
		const response = await fetch("/addToFavourite", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `musicId=${encodeURIComponent(musicId)}&action=${action}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else if (data.status === 201) {
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
		const response = await fetch("/addToPlaylist", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `playlistId=${encodeURIComponent(
				playlistId,
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
		const response = await fetch("/createPlaylist", {
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
		const response = await fetch("/getPlaylist", {
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
		const response = await fetch("/addToHistory", {
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
		const response = await fetch("/checkLoginStatus", {
			method: "POST",
		});
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

async function fetchNotifications(numbers = 5) {
	try {
		const response = await fetch("/fetchNotifications", {
			method: "POST",
			body: `numbers=${encodeURIComponent(numbers)}`,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return [];
	}
}

async function deleteNotification(notificationId) {
	try {
		const response = await fetch("/deleteNotification", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `notificationId=${encodeURIComponent(notificationId)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error deleting notification:", error);
		return false;
	}
}

async function setNotificationReadStatus(notificationId) {
	try {
		const response = await fetch("/setNotificationReadStatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `notificationId=${encodeURIComponent(notificationId)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error updating notification read status:", error);
		return false;
	}
}

async function sendOtp(email, purpose = "register") {
	try {
		const response = await fetch("/modules/otpConfig", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `email=${encodeURIComponent(
				email,
			)}&action=sendOtp&purpose=${purpose}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error sending OTP:", error);
		return false;
	}
}

async function checkOtp(otp, email) {
	try {
		const response = await fetch("/otpConfig", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `otp=${encodeURIComponent(
				otp,
			)}&action=verifyOtp&email=${encodeURIComponent(email)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error checking OTP:", error);
		return false;
	}
}

async function checkUsername(username) {
	try {
		const response = await fetch("/checkUsername", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `username=${encodeURIComponent(username)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else if (data.status === 409) {
			return false;
		}
	} catch (error) {
		console.error("Error checking username:", error);
		return false;
	}
}

async function checkEmail(email) {
	try {
		const response = await fetch("/checkEmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `email=${encodeURIComponent(email)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			return true;
		} else if (data.status === 409) {
			return false;
		}
	} catch (error) {
		console.error("Error checking email:", error);
		return false;
	}
}

// Function to handle user login
async function loginUser(loginForm) {
	// Create a new FormData object with the login form data
	let data = new FormData(loginForm);

	try {
		// Send a POST request to "/modules/loginUser.php" with the form data
		let response = await fetch("/loginUser", {
			method: "POST",
			body: data,
		});

		// Parse the response as JSON
		let result = await response.json();

		// Handle the response based on the status code
		if (result.status == 200) {
			window.location.href = "/";
		} else if (result.status == 400) {
			showError(loginForm, "The username or password is invalid");
		}
	} catch (error) {
		console.error("Error logging in:", error);
		showError(loginForm, "An error occurred. Please try again.");
	}
}

async function registerUser(formData) {
	try {
		const response = await fetch("/registerUser", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();

		if (data.status === 200) {
			return true;
		} else {
			showError(data);
		}
	} catch (error) {
		showError(error.message);
	}
}

async function resetPassword(email, password) {
	try {
		const response = await fetch("/resetPassword", {
			method: "POST",
			body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
				password,
			)}`,
		});
		const data = await response.json();

		if (data.status === 200) {
			return true;
		} else {
			showError(data);
		}
	} catch (error) {
		showError(error.message);
	}
}

async function fetchMusicQueue(musicId, mode, queueId) {
	let endpoint;
	switch (mode) {
		case "playlist":
			endpoint = "/getPlaylistQueue";
			break;

		case "trending":
			endpoint = "/getTrendingQueue";
			break;
		case "favourites":
			endpoint = "/getFavouritesQueue";
			break;

		default:
			endpoint = "/getMusicQueue";
			break;
	}

	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `id= ${encodeURIComponent(musicId)}&playlistId=${encodeURIComponent(
				queueId,
			)}`,
		});
		const data = await response.json();
		return Object.values(data);
	} catch (error) {
		console.error("Error fetching music queue:", error);
		return [];
	}
}

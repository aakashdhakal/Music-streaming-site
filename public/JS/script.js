let baseUrl = "/WEB-PROJECT";

let notificationCount = 5;
showNotifications(notificationCount);
setInterval(() => {
	console.log("checking for new notifications");
	showNotifications(notificationCount);
}, 10000);

let openNotificationBtn = document.querySelector(".notification-btn");
let notificationWindow = document.querySelector("#notificationWindow");
let notificationBody = document.querySelector(".notification-body");
let seeAllNotificationsBtn = document.querySelector("#seeAllNotifications");
let unreadNotificationCount = 0;
let documentTitle = document.title;
let markAllAsReadBtn = document.querySelector(".mark-all-as-read");

markAllAsReadBtn.addEventListener("click", function () {
	let notifications = document.querySelectorAll(".notification-card");
	notifications.forEach((notification) => {
		let status = notification.getAttribute("data-readStatus");
		let notificationId = notification.getAttribute("data-notificationId");
		if (status === "0") {
			markAsRead(notificationId);
			notification.setAttribute("data-readStatus", 1);
		}
	});
});

seeAllNotificationsBtn.addEventListener("click", function () {
	notificationCount = -1;
	showNotifications();
	seeAllNotificationsBtn.style.display = "none";
});

async function markAsRead(notificationId) {
	let status = await setNotificationReadStatus(notificationId);
	if (status) {
		showNotifications(notificationCount);
	}
}

async function showNotifications(number) {
	let notifications = await fetchNotifications();
	notificationBody.innerHTML = "";
	openNotificationBtn.style.setProperty("--unreadNotificationMark", "none");
	if (notifications.status === 404) {
		notificationBody.innerHTML = `<div class="no-notifications">
                    <iconify-icon icon="mynaui:bell-x"></iconify-icon>
                    <p>No new notifications</p>
                </div>`;
		seeAllNotificationsBtn.style.display = "none";
		return;
	} else {
		let notificationCount = 0;
		unreadNotificationCount = notifications.filter(
			(notification) => notification.read_status === "0",
		).length;
		notifications.forEach((notification) => {
			if (notificationCount === number && number === 5) {
				seeAllNotificationsBtn.style.display = "flex";
				return;
			}
			if (notificationCount <= 5) {
				seeAllNotificationsBtn.style.display = "none";
			}
			notificationCount++;

			let notificationIcons = {
				like: "fluent:thumb-like-16-filled",
				follow: "si:user-fill",
			};

			let iconifyIcon = notificationIcons[notification.subject];
			let message = notification.message;
			let time = formatTime(notification.time);
			// Create the notification card container

			if (notification.read_status === "0") {
				openNotificationBtn.style.setProperty(
					"--unreadNotificationMark",
					"block",
				);
			}

			notificationBody.innerHTML += `<div class="notification-card" data-readStatus="${notification.read_status}" data-notificationId = "${notification.id}">
                    <div class="notification-info">
                        <iconify-icon icon="${iconifyIcon}"></iconify-icon>
                        <div class="notification-details">
                            <p class="notification-message">${message}</p>
                            <p class="notification-time">${time}</p>
                        </div>
                    </div>
                    <button id="clearNotification">
                        <iconify-icon icon="ic:outline-delete"></iconify-icon>
                    </button>
                </div>`;
		});
	}
	document.title =
		unreadNotificationCount > 0
			? `(${unreadNotificationCount}) ${documentTitle}`
			: documentTitle;
	if (unreadNotificationCount === 0) {
		openNotificationBtn.style.setProperty("--unreadNotificationMark", "none");
	} else {
		openNotificationBtn.style.setProperty("--unreadNotificationMark", "block");
	}
	unreadNotificationCount = 0;
}

function formatTime(time) {
	const now = new Date();
	const date = new Date(time);
	const diff = Math.abs(now - date);
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	const diffWeeks = Math.floor(diffDays / 7);
	const diffYears = now.getFullYear() - date.getFullYear();
	const diffmonths = diffYears * 12 + now.getMonth() - date.getMonth();

	if (diffYears >= 1) {
		// More than a year ago, return the specific date
		const options = {
			year: "numeric",
			month: "short",
			day: "numeric",
		};
		return date.toLocaleDateString("en-US", options);
	} else if (diffmonths < 12 && diffmonths >= 1) {
		// More than a month ago, return months ago
		return `${diffmonths} month${diffmonths > 1 ? "s" : ""} ago`;
	} else if (diffWeeks >= 1) {
		// More than a week ago, return weeks ago
		return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
	} else if (diffDays >= 1) {
		// More than a day ago, return days ago
		return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
	} else {
		// Less than a day ago, return hours or minutes ago
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		const diffMinutes = Math.floor(diff / (1000 * 60));
		if (diffHours >= 1) {
			return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
		} else {
			return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
		}
	}
}

openNotificationBtn.addEventListener("click", function () {
	openNotificationBtn.classList.toggle("active");
	notificationWindow.classList.toggle("openNotificationWindow");
});

document.addEventListener("click", function (e) {
	if (
		e.target &&
		!e.target.matches("#notificationWindow *") &&
		!e.target.matches(".notification-btn *")
	) {
		if (notificationWindow.classList.contains("openNotificationWindow")) {
			openNotificationBtn.classList.remove("active");
			notificationWindow.classList.remove("openNotificationWindow");
		}
	}

	if (
		e.target &&
		e.target.matches(".notification-card *") &&
		!e.target.matches("#clearNotification *")
	) {
		let status = e.target
			.closest(".notification-card")
			.getAttribute("data-readStatus");
		let notificationId = e.target
			.closest(".notification-card")
			.getAttribute("data-notificationId");

		if (status === "0") {
			markAsRead(notificationId);
			e.target.closest(".notification-card").setAttribute("data-readStatus", 1);
		}
	}

	if (e.target && e.target.matches("#clearNotification *")) {
		let notificationId = e.target
			.closest(".notification-card")
			.getAttribute("data-notificationId");
		deleteNotification(notificationId);
		showNotifications(notificationCount);
	}
	if (
		e.target &&
		!e.target.matches("#profileWindow *") &&
		!e.target.matches(".profile-btn *")
	) {
		if (profileDropdownWindow.classList.contains("openProfileWindow")) {
			profileDropdownWindow.classList.remove("openProfileWindow");
		}
	}
	if (e.target && e.target.matches("dialog")) {
		closeDialog(e.target);
	}
});

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

		{ duration: 500, fill: "forwards" },
	);
}

function hideAlertAnimate(alert) {
	alert.animate(
		[
			{ width: "100%", opacity: 1 },
			{ width: "0%", opacity: 0 },
		],
		{ duration: 500, fill: "forwards" },
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

function changeTheme() {
	console.log("changing theme");
	let theme = localStorage.getItem("theme");
	if (theme === "dark") {
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");
	} else {
		document.body.classList.add("dark");
		localStorage.setItem("theme", "dark");
	}
}

// let darkModeBtn = document.querySelector(".dark-mode-btn");
// darkModeBtn.addEventListener("click", function () {
// 	console.log("clicked");
// 	changeTheme();
// });

let collapseExpandSidebarButton = document.querySelector(
	"#collapseExpandSidebar",
);
let sidebar = document.querySelector("#sideNav");
if (localStorage.getItem("sidebar") === "collapse") {
	sidebar.classList.add("collapse");
}
collapseExpandSidebarButton.addEventListener("click", function () {
	sidebar.classList.toggle("collapse");
	if (sidebar.classList.contains("collapse")) {
		localStorage.setItem("sidebar", "collapse");
	} else {
		localStorage.setItem("sidebar", "expand");
	}
});

//all api calls

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

async function fetchNotifications(numbers = 5) {
	try {
		const response = await fetch(baseUrl + "/modules/fetchNotifications.php", {
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
		const response = await fetch(baseUrl + "/modules/deleteNotification.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `notificationId=${encodeURIComponent(notificationId)}`,
		});
		const data = await response.json();
		if (data.status === 200) {
			console.log("notification deleted");
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
		const response = await fetch(
			baseUrl + "/modules/setNotificationReadStatus.php",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `notificationId=${encodeURIComponent(notificationId)}`,
			},
		);
		const data = await response.json();
		if (data.status === 200) {
			console.log("notification read status updated");
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error updating notification read status:", error);
		return false;
	}
}

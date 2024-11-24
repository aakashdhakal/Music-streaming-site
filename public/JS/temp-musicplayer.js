// Select DOM elements
const playPauseBtn = document.querySelector(".play-pause-btn");
const musicControls = document.querySelector("#musicControls");
const seekbar = document.querySelector("#seekbar");
const shuffleBtn = document.querySelector(".shuffle-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const volumeBtn = document.querySelector(".volume-btn");
const volume = document.querySelector("#volume");
const addToPlaylistDialogShowBtn = document.querySelector(
	".add-to-playlist-dialog-show-btn",
);
const addToPlaylistDialog = document.querySelector("#addToPlaylistDialog");
const playlistContainer = document.querySelectorAll(".playlists");
const likeBtns = document.querySelectorAll(".like-btn");
const prevMusicBtn = document.querySelector(".prev-btn");
const nextMusicBtn = document.querySelector(".next-btn");

const playIcon =
	"<iconify-icon icon='solar:play-bold' style='color:#ff7f11'></iconify-icon>";
const pauseIcon =
	"<iconify-icon icon='solar:pause-bold' style='color:#ff7f11'></iconify-icon>";

let isPlaying = false;
let music = new Audio();
let musicId = null;
let loaded = false;
let playedMusicQueue = [];
let nextMusicQueue = [];

async function addMusicToQueue(currentPlayMode = "normal", queueId = null) {
	// Add music to the queue
	let queue = await fetchMusicQueue(currentPlayMode, queueId);
	//add ids to the queue
	nextMusicQueue = queue.map((music) => music.id);
}

// Function to set like status of the song
function setLikeBtnStatus(btn, status) {
	// btn.innerHTML =
	// 	status === "like"
	// 		? '<i class="fa-solid fa-heart" style="color: #ff7f11;"></i>'
	// 		: '<i class="fa-regular fa-heart"></i>';
	// btn.setAttribute("data-liked", status === "like" ? "true" : "false");
}

// Check if the given music ID is already loaded
function isMusicLoaded(id) {
	return musicId === id;
}

// Load music by ID
async function loadMusic(id) {
	const musicData = await fetchMusic(id);
	musicId = musicData.id;
	document.title = `${musicData.title} - ${musicData.firstname} ${musicData.lastname}`;
	music.src = musicData.filePath;
	music.load();
	music.addEventListener("loadedmetadata", () => {
		updateMusicControls(musicData);
		loaded = true;
	});
	await addToHistory(musicData.id);
	addToPrevMusic(musicData.id);
}

// Format the duration of the music in minutes and seconds
function formatDuration(duration) {
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60)
		.toString()
		.padStart(2, "0");
	return `${minutes}:${seconds}`;
}

// Update music controls with music data
function updateMusicControls(musicData) {
	const musicTitle = document.querySelector(".music-title");
	const musicArtist = document.querySelector(".music-artist");
	const musicCover = document.querySelector(".music-cover");
	const totalDuration = document.querySelector(".total-duration");

	if (musicData.isFavourite) {
		setLikeBtnStatus(likeBtns, "like");
	}

	musicTitle.innerHTML = musicData.title;
	musicArtist.innerHTML = `${musicData.firstname} ${musicData.lastname}`;
	musicCover.src = musicData.coverImage;
	totalDuration.innerHTML = formatDuration(music.duration);

	if (!loaded) {
		musicControls.animate([{ bottom: "-10%" }, { bottom: "0" }], {
			duration: 500,
			easing: "ease-in-out",
			fill: "forwards",
		});
	}
}

// Function to play the music
function playMusic() {
	music.play();
	isPlaying = true;
	playPauseBtn.innerHTML = pauseIcon;
}

// Function to pause the music
function pauseMusic() {
	music.pause();
	isPlaying = false;
	playPauseBtn.innerHTML = playIcon;
}
// Function to add current music to the nextMusicQueue list
function addToNextMusic(currentMusicId) {
	if (!nextMusicQueue.includes(currentMusicId)) {
		nextMusicQueue.push(currentMusicId);
	}
}

// Function to add current music to the playedMusicQueue list
function addToPrevMusic(currentMusicId) {
	if (!playedMusicQueue.includes(currentMusicId)) {
		playedMusicQueue.push(currentMusicId);
	}
}

prevMusicBtn.addEventListener("click", async () => {
	if (playedMusicQueue.length > 1) {
		// Add current music to nextMusicQueue list
		addToNextMusic(musicId);

		// Remove the last played music and load the previous one
		playedMusicQueue.pop();
		await loadMusic(playedMusicQueue.pop());
		playMusic();
	}
});

nextMusicBtn.addEventListener("click", async () => {
	if (nextMusicQueue.length) {
		// Add current music to playedMusicQueue list
		addToHistory(musicId);

		// Load the next music from the nextMusicQueue list
		await loadMusic(nextMusicQueue.shift());
		playMusic();
	}
});

// Event listener for updating seekbar and current duration
music.addEventListener("timeupdate", () => {
	if (music.duration) {
		const currentDuration = document.querySelector(".current-duration");
		const position = (music.currentTime / music.duration) * 100;
		seekbar.value = position;
		seekbar.style.setProperty("--seek-before-width", `${position}%`);
		currentDuration.innerText = formatDuration(music.currentTime);
	}
});

// Event listener for music end
music.addEventListener("ended", () => {
	if (repeatBtn.getAttribute("data-repeat") === "true") {
		playMusic();
	} else {
		setTimeout(() => {
			nextMusicBtn.click();
		}, 2000);
	}
});

// Event listeners for seekbar
seekbar.addEventListener("mouseout", () =>
	seekbar.style.setProperty("--thumb-display", "none"),
);
seekbar.addEventListener("mousemove", () =>
	seekbar.style.setProperty("--thumb-display", "block"),
);
seekbar.addEventListener(
	"input",
	() => (music.currentTime = music.duration * (seekbar.value / 100)),
);

// Function to toggle button state
function toggleButton(button, attribute, otherButton, otherAttribute) {
	const isActive = button.getAttribute(attribute) === "true";
	button.style.color = isActive ? "var(--text-color-light)" : "#ff7f11";
	button.setAttribute(attribute, isActive ? "false" : "true");

	if (otherButton.getAttribute(otherAttribute) === "true") {
		otherButton.click();
	}
}

// Event listeners for shuffle and repeat buttons
shuffleBtn.addEventListener("click", () =>
	toggleButton(shuffleBtn, "data-shuffle", repeatBtn, "data-repeat"),
);
repeatBtn.addEventListener("click", () =>
	toggleButton(repeatBtn, "data-repeat", shuffleBtn, "data-shuffle"),
);

// Event listener for play/pause button
playPauseBtn.addEventListener("click", () =>
	isPlaying ? pauseMusic() : playMusic(),
);

// Function to mute the music
function mute() {
	localStorage.setItem("volume", volume.value);
	volumeBtn.innerHTML = '<iconify-icon icon="mage:volume-mute"></iconify-icon>';
	volume.value = 0;
	music.volume = 0;
	volume.style.setProperty("--volume-before-width", `${volume.value}px`);
}

// Function to adjust the volume
function adjustVolume(volumeValue) {
	volume.style.setProperty("--volume-before-width", `${volumeValue}px`);
	music.volume = volumeValue / 100;
	volume.value = volumeValue;

	if (volumeValue <= 0) {
		volumeBtn.innerHTML =
			'<iconify-icon icon="mage:volume-mute"></iconify-icon>';
	} else if (volumeValue < 50) {
		volumeBtn.innerHTML =
			'<iconify-icon icon="mage:volume-down"></iconify-icon>';
	} else {
		volumeBtn.innerHTML = '<iconify-icon icon="mage:volume-up"></iconify-icon>';
	}
}

// Event listener for volume button
volumeBtn.addEventListener("click", () => {
	if (volume.value <= 0) {
		adjustVolume(localStorage.getItem("volume"));
	} else {
		mute();
	}
});

// Event listener for volume input
volume.addEventListener("input", () => {
	if (volume.value <= 0) {
		mute();
		localStorage.setItem("volume", 20);
	} else {
		localStorage.setItem("volume", volume.value);
		adjustVolume(volume.value);
	}
	volume.title = `${Math.floor(volume.value)}%`;
});

// Event listeners for volume input mouse events
volume.addEventListener("mouseout", () =>
	volume.style.setProperty("--thumb-display", "none"),
);
volume.addEventListener("mousemove", () =>
	volume.style.setProperty("--thumb-display", "block"),
);

// Event listener for keydown events
document.addEventListener("keydown", (e) => {
	if (e.target.matches("input")) return;

	switch (e.key) {
		case " ":
			e.preventDefault();
			isPlaying ? pauseMusic() : playMusic();
			break;
		case "ArrowRight":
			music.currentTime += 5;
			break;
		case "ArrowLeft":
			music.currentTime -= 5;
			break;
		case "m":
			volumeBtn.click();
			break;
		case "f":
			likeBtns.click();
			break;
		case "r":
			repeatBtn.click();
			break;
		case "s":
			shuffleBtn.click();
			break;
		case "p":
			addToPlaylistBtn.click();
			break;
	}
});

// Function to display playlists
async function displayPlaylists() {
	const data = await fetchPlaylists();
	playlistContainer.forEach((container) => {
		container.innerHTML = data;
	});
}

// Event listener for like buttons
likeBtns.forEach((btn) => {
	btn.addEventListener("click", async () => {
		const musicId = btn.getAttribute("data-musicId");
		const action =
			btn.getAttribute("data-liked") === "false" ? "like" : "unlike";
		if (setLikeBtnStatus(musicId, action)) {
			setLikeBtnStatus(btn, action);
			showAlert(
				`Music ${action === "like" ? "added to" : "removed from"} favourites`,
				"success",
			);
		}
	});
});

// Event listener for document clicks
document.addEventListener("click", async (e) => {
	const startPlayBtn = e.target.closest(".start-play-music");
	if (startPlayBtn) {
		const musicId = startPlayBtn.getAttribute("data-musicId");
		if (isMusicLoaded(musicId)) {
			isPlaying ? pauseMusic() : playMusic();
		} else {
			await loadMusic(musicId);
			playMusic();
		}
		await addMusicToQueue();
	}

	if (e.target.closest(".expand-current-song")) {
		const currentSongContainer = e.target.closest("#musicControls");
		currentSongContainer.classList.toggle("expanded");
		if (currentSongContainer.classList.contains("expanded")) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
});

// Event listener for fullscreen change
document.addEventListener("fullscreenchange", () => {
	const currentSongContainer = document.querySelector("#musicControls");
	if (!document.fullscreenElement) {
		currentSongContainer.classList.remove("expanded");
	}
});

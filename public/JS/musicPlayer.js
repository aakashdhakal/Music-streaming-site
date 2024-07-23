let shuffleBtn = document.querySelector(".shuffle-btn");
let repeatBtn = document.querySelector(".repeat-btn");
let playPauseBtn = document.querySelector(".play-pause-btn");
let isplaying = null;
let seekbar = document.querySelector("#seekbar");
let music = new Audio();
let volume = document.querySelector("#volume");
let currentDuration = document.querySelector(".current-duration");
let totalDuration = document.querySelector(".total-duration");
let volumeBtn = document.querySelector(".volume-btn");
let likeBtn = document.querySelector(".like-btn");
let addToPlaylistDialog = document.querySelector("#addToPlaylistDialog");
let addToPlaylistBtn = document.querySelector(".playlist-btn");
let playlistCard = document.querySelectorAll(".playlist-card");
let songCount = document.querySelectorAll(".song-count .count");
let musicControls = document.querySelector(".music-controls");
let playlistContainer = document.querySelectorAll(".playlists");
let showCreatePlaylistDialog = document.querySelectorAll(
	".show-create-playlist-dialog-btn"
);
let createPlaylistDialog = document.querySelector("#createNewPlaylistDialog");
let isControlFocused = false;

let startPlayMusic = document.querySelectorAll(".start-play-music");

startPlayMusic.forEach((btn) => {
	btn.addEventListener("click", function () {
		let musicId = btn.getAttribute("data-musicId");
		fetch("/WEB-PROJECT/modules/fetchMusic.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: "musicId=" + encodeURIComponent(musicId),
		})
			.then((response) => response.json())
			.then((data) => {
				loadMusic(data);
			});
	});
});

shuffleBtn.addEventListener("click", function () {
	if (shuffleBtn.getAttribute("data-shuffle") === "false") {
		shuffleBtn.style.color = "#ff7f11";
		shuffleBtn.setAttribute("data-shuffle", "true");

		if (repeatBtn.getAttribute("data-repeat") === "true") {
			repeatBtn.click();
		}
	} else {
		shuffleBtn.style.color = "#000";
		shuffleBtn.setAttribute("data-shuffle", "false");
	}
});

repeatBtn.addEventListener("click", function () {
	if (repeatBtn.getAttribute("data-repeat") === "false") {
		repeatBtn.style.color = "#ff7f11";
		repeatBtn.setAttribute("data-repeat", "true");

		if (shuffleBtn.getAttribute("data-shuffle") === "true") {
			shuffleBtn.click();
		}
	} else {
		repeatBtn.style.color = "#000";
		repeatBtn.setAttribute("data-repeat", "false");
	}
});

playPauseBtn.addEventListener("click", function () {
	if (isplaying) {
		//pause music
		pauseMusic();
	} else {
		//resume music
		playMusic();
	}
});

function setFavouriteStatus(status) {
	if (status) {
		likeBtn.style.color = "#ff7f11";
		likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
		likeBtn.setAttribute("data-liked", "true");
	} else {
		likeBtn.style.color = "#000";
		likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
		likeBtn.setAttribute("data-liked", "false");
	}
}

function loadMusic(musicData) {
	music.src = musicData.filePath;
	music.load();
	playMusic();
	isplaying = true;
	document.title =
		musicData.title + " - " + musicData.firstname + " " + musicData.lastname;
	console.log(musicData.isFavourite);
	setFavouriteStatus(musicData.isFavourite);
	let musicTitle = document.querySelector(".music-title");
	let musicArtist = document.querySelector(".music-artist");
	let musicCover = document.querySelector(".music-cover");
	musicTitle.innerText = musicData.title;
	musicArtist.innerText = musicData.firstname + " " + musicData.lastname;
	if (musicData.isVerified) {
		musicArtist.innerHTML +=
			'  <i class="fa-solid fa-badge-check" title="verified"></i>';
	}
	musicCover.src = musicData.coverImage;
	likeBtn.setAttribute("data-musicId", musicData.id);
}

function playMusic() {
	music.play();
	playPauseBtn.innerHTML =
		'<i class="fa-solid fa-circle-pause" style="color: #ff7f11;"></i>';
	isplaying = true;
}

function pauseMusic() {
	music.pause();
	playPauseBtn.innerHTML =
		'<i class="fa-solid fa-circle-play" style="color: #ff7f11;"></i>';
	isplaying = false;
}

function mute() {
	console.log("muted");
	volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
	volume.value = 0;
	music.volume = 0;
	volume.style.setProperty("--volume-before-width", volume.value + "px");
}

function formatDuration(duration) {
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return minutes + ":" + seconds;
}

music.addEventListener("timeupdate", function () {
	if (music.duration) {
		// Check if duration is not NaN or undefined
		let position = (music.currentTime / music.duration) * 100; // Calculate current position as a percentage
		seekbar.value = position; // Update the seekbar's value
		seekbar.style.setProperty("--seek-before-width", position + "%"); // Update the seekbar's CSS
		currentDuration.innerText = formatDuration(music.currentTime);
		totalDuration.innerText = formatDuration(music.duration);
	}
});

music.addEventListener("ended", function () {
	if (repeatBtn.getAttribute("data-repeat") === "true") {
		setTimeout(() => {
			music.currentTime = 0;
			playMusic();
		}, 1000);
	} else {
		isplaying = false;
		playPauseBtn.innerHTML =
			'<i class="fa-solid fa-circle-play" style="color: #ff7f11;"></i>';
	}
});

seekbar.addEventListener("input", function () {
	if (music.duration) {
		const seekTo = (seekbar.value / 100) * music.duration; // Reverse the percentage calculation
		music.currentTime = seekTo; // Seek the music to the new time
		console.log(seekTo);
	}
});
seekbar.addEventListener("mouseout", function () {
	seekbar.style.setProperty("--thumb-display", "none");
});

seekbar.addEventListener("mousemove", function (e) {
	seekbar.style.setProperty("--thumb-display", "block");
});

function mute() {
	console.log("muted");
	localStorage.setItem("volume", volume.value);
	volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
	volume.value = 0;
	music.volume = 0;
	volume.style.setProperty("--volume-before-width", volume.value + "px");
}

function adjustVolume(volumeValue) {
	volume.style.setProperty("--volume-before-width", volumeValue + "px");
	music.volume = volumeValue / 100;
	volume.value = volumeValue;

	if (volumeValue < 50) {
		volumeBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
	} else {
		volumeBtn.innerHTML = '<i class="fa-solid fa-volume"></i>';
	}
	console.log("unmuted");
}

volume.addEventListener("input", function () {
	if (volume.value <= 0) {
		mute();
	} else {
		localStorage.setItem("volume", volume.value);
		adjustVolume(volume.value);
	}
	volume.title = Math.floor(volume.value) + "%";
});

volumeBtn.addEventListener("click", function () {
	console.log(volume.value);

	if (volume.value <= 0) {
		adjustVolume(localStorage.getItem("volume"));
	} else {
		mute();
	}
	console.log(volume.value);
});
volume.addEventListener("mouseout", function () {
	volume.style.setProperty("--thumb-display", "none");
});

volume.addEventListener("mousemove", function (e) {
	volume.style.setProperty("--thumb-display", "block");
});

//Function to like or dislike a music
likeBtn.addEventListener("click", async function () {
	let action;
	if (likeBtn.getAttribute("data-liked") === "false") {
		action = "like";
	} else {
		action = "unlike";
	}
	let musicId = likeBtn.getAttribute("data-musicId");
	if (await setLikeStatus(musicId, action)) {
		if (action === "like") {
			setFavouriteStatus(true);
		} else {
			setFavouriteStatus(false);
		}
	}
});

//Function to add music to playlist
addToPlaylistBtn.addEventListener("click", function () {
	addToPlaylistDialog.showModal();
});

addToPlaylistDialog.addEventListener("click", async function (e) {
	//Add music to playlist
	let playlistCard = e.target.closest(".playlist-card");
	if (playlistCard) {
		let musicId = likeBtn.getAttribute("data-musicId");
		let playlistId = playlistCard.getAttribute("data-playlistId");
		if (await addToPlaylist(playlistId, musicId)) {
			alert("Music added to playlist");
			await displayPlaylists();
		}
	}
});

async function displayPlaylists() {
	let data = await fetchPlaylists();
	playlistContainer.forEach((container) => {
		container.innerHTML = data;
	});
}

showCreatePlaylistDialog.forEach((btn) => {
	btn.addEventListener("click", function () {
		createPlaylistDialog.showModal();
	});
});

let createPlaylistForm = document.querySelector(".create-playlist-form");
createPlaylistForm.addEventListener("submit", async function (e) {
	e.preventDefault();
	let formData = new FormData(createPlaylistForm);
	if (await createPlaylist(formData)) {
		alert("Playlist created successfully");
		createPlaylistDialog.close();
		await displayPlaylists();
		createPlaylistForm.reset();
	}
});

playlistContainer.forEach((container) => {
	container.addEventListener("click", async function (e) {
		let createPlaylistBtn = e.target.closest(
			".show-create-playlist-dialog-btn"
		);
		if (createPlaylistBtn) {
			createPlaylistDialog.showModal();
		}
	});
});

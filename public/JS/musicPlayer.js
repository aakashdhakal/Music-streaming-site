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
	} else {
		shuffleBtn.style.color = "#000";
		shuffleBtn.setAttribute("data-shuffle", "false");
	}
});

repeatBtn.addEventListener("click", function () {
	if (repeatBtn.getAttribute("data-repeat") === "false") {
		repeatBtn.style.color = "#ff7f11";
		repeatBtn.setAttribute("data-repeat", "true");
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

function loadMusic(musicData) {
	console.log(musicData);
	music.src = musicData.filePath;
	music.load();
	playMusic();
	isplaying = true;
	document.title =
		musicData.title + " - " + musicData.firstname + " " + musicData.lastname;

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
}

function playMusic() {
	music.play();
	playPauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause fa-2xl"></i>';
	isplaying = true;
}

function pauseMusic() {
	music.pause();
	playPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play fa-2xl"></i>';
	isplaying = false;
}

function mute() {
	volumeBtn.innerHTML = '<i class="fa-duotone fa-volume-xmark"></i>';
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
		playPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play fa-2xl"></i>';
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
	seekbar.style.setProperty("--seek-after-width", "0px");
	seekbar.style.setProperty("--thumb-display", "none");
});

seekbar.addEventListener("mousemove", function (e) {
	let width = e.clientX;
	seekbar.style.setProperty("--seek-after-width", width + "px");
	seekbar.style.setProperty("--thumb-display", "block");
});

volume.addEventListener("input", function () {
	music.volume = volume.value / 100;
	volume.style.setProperty("--volume-before-width", volume.value + "px");
	if (volume.value == 0) {
		mute();
	} else if (volume.value < 50) {
		volumeBtn.innerHTML = '<i class="fa-duotone fa-volume-low"></i>';
	} else if (volume.value < 80) {
		volumeBtn.innerHTML = '<i class="fa-duotone fa-volume"></i>';
	} else {
		volumeBtn.innerHTML = '<i class="fa-duotone fa-volume-high"></i>';
	}
	music.volume = volume.value / 100;
});

volumeBtn.addEventListener("click", function () {
	if (volume.value === "0") {
		music.volume = 0.5;
		volume.value = 50;
		volume.style.setProperty("--volume-before-width", volume.value + "px");
	} else {
		mute();
	}
});

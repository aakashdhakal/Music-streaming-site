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

//temp btn for testing
let startPlayMusic = document.querySelectorAll(".start-play-music");

startPlayMusic.forEach((btn) => {
	btn.addEventListener("click", function () {
		loadMusic(btn.getAttribute("data-source"));
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

function loadMusic(source) {
	music.src = source;
	music.load();
	playMusic();
	isplaying = true;
	let songTitle = document.querySelector(".song-title");
	let artistName = document.querySelector(".artist-name");
	document.title = songTitle.innerText + " - " + artistName.innerText;
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

music.addEventListener("timeupdate", function () {
	if (music.duration) {
		// Check if duration is not NaN or undefined
		let position = (music.currentTime / music.duration) * 100; // Calculate current position as a percentage
		seekbar.value = position; // Update the seekbar's value
		seekbar.style.setProperty("--seek-before-width", position + "%"); // Update the seekbar's CSS

		let currentMinutes = Math.floor(music.currentTime / 60);
		let currentSeconds = Math.floor(music.currentTime - currentMinutes * 60);
		let durationMinutes = Math.floor(music.duration / 60);
		let durationSeconds = Math.floor(music.duration - durationMinutes * 60);

		if (currentSeconds < 10) {
			currentSeconds = "0" + currentSeconds;
		}
		if (durationSeconds < 10) {
			durationSeconds = "0" + durationSeconds;
		}
		if (currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}
		if (durationMinutes < 10) {
			durationMinutes = "0" + durationMinutes;
		}
		currentDuration.innerText = currentMinutes + ":" + currentSeconds;
		totalDuration.innerText = durationMinutes + ":" + durationSeconds;
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
});

seekbar.addEventListener("mousemove", function (e) {
	let width = e.clientX;
	seekbar.style.setProperty("--seek-after-width", width + "px");
});

volume.addEventListener("input", function () {
	music.volume = volume.value / 100;
	volume.style.setProperty("--volume-before-width", volume.value + "px");
	if (volume.value == 0) {
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
		volumeBtn.value = "0";
	} else {
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		volumeBtn.value = "1";
	}
});

volumeBtn.addEventListener("click", function () {
	if (volumeBtn.value === "0") {
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		volumeBtn.value = "1";
		music.volume = volume.value / 100;
	} else {
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
		volumeBtn.value = "0";
		music.volume = 0;
	}
});

// Select the element with class "top-nav"
let topNav = document.querySelector(".top-nav");

// Add a scroll event listener to the document
document.addEventListener("scroll", function () {
	// Check if the user has scrolled down
	if (window.scrollY > 0) {
		// If scrolled down, change the background color and add a box shadow to the topNav element
		topNav.style.backgroundColor = "#ffffff";
		topNav.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
	} else {
		// If not scrolled down, make the background transparent and remove the box shadow from the topNav element
		topNav.style.backgroundColor = "transparent";
		topNav.style.boxShadow = "none";
	}
});

let playPauseBtn = document.querySelector(".play-pause-btn");
let musicControls = document.querySelector(".music-controls");
let playIcon =
	"<i class='fa-duotone fa-solid fa-circle-play' style='--fa-primary-color: #ffffff; --fa-secondary-color: #ff7f11; --fa-secondary-opacity: 1;'></i>";
let pauseIcon =
	"<i class='fa-duotone fa-solid fa-circle-pause' style='--fa-primary-color: #ffffff; --fa-secondary-color: #ff7f11; --fa-secondary-opacity: 1;'></i>";
let isPlaying = false;
let music = new Audio();
let musicId = null;
let loaded = false;

//function to set like status of the song
function setLikeBtnStatus(btn, status) {
	switch (status) {
		case "like":
			btn.innerHTML =
				'<i class="fa-solid fa-heart" style="color: #ff7f11;"></i>';
			btn.setAttribute("data-liked", "true");
			break;
		case "unlike":
			btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
			btn.setAttribute("data-liked", "false");
			break;
	}
}

// Check if the given music ID is already loaded
function isMusicLoaded(id) {
	if (musicId == id) {
		return true;
	} else {
		return false;
	}
}

async function loadMusic(id) {
	musicData = await fetchMusic(id);
	musicId = musicData.id;
	console.log(musicData);
	document.title =
		musicData.title + " - " + musicData.firstname + " " + musicData.lastname;
	music.src = musicData.filePath;
	music.load();
	music.addEventListener("loadedmetadata", function () {
		updateMusicControls(musicData);
		loaded = true;
	});
	await addToHistory(musicData.id);
}

// Format the duration of the music in minutes and seconds
function formatDuration(duration) {
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return minutes + ":" + seconds;
}

function updateMusicControls(musicData) {
	let musicTitle = document.querySelector(".music-title");
	let musicArtist = document.querySelector(".music-artist");
	let musicCover = document.querySelector(".music-cover");
	let totalDuration = document.querySelector(".total-duration");
	let likeBtn = musicControls.querySelector(".like-btn");

	if (musicData.isFavourite) {
		setLikeBtnStatus(likeBtn, "like");
	}

	musicTitle.innerHTML = musicData.title;
	musicArtist.innerHTML = musicData.firstname + " " + musicData.lastname;
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
	let startPlayBtn = document.querySelectorAll(".start-play-music");
	// Iterate over each startPlayBtn element
	startPlayBtn.forEach((btn) => {
		// Check if the musicId attribute of the button matches the current musicId
		if (btn.getAttribute("data-musicId") == musicId) {
			// Change the innerHTML of the button to display a pause icon
			btn.innerHTML = pauseIcon;
		} else {
			// Change the innerHTML of the button to display a play icon
			btn.innerHTML = playIcon;
		}
		// Play the music
		music.play();
		// Set the isPlaying flag to true
		isPlaying = true;
		// Change the play/pause button icon to a pause icon
		playPauseBtn.innerHTML = pauseIcon;
	});
}

// Function to pause the music
function pauseMusic() {
	let startPlayBtn = document.querySelectorAll(".start-play-music");
	// Iterate over each startPlayBtn element
	startPlayBtn.forEach((btn) => {
		// Check if the musicId attribute of the button matches the current musicId
		if (btn.getAttribute("data-musicId") == musicId) {
			// Change the innerHTML of the button to display a play icon
			btn.innerHTML = playIcon;
		}
		// Pause the music
		music.pause();
		// Set the isPlaying flag to false
		isPlaying = false;
		// Change the play/pause button icon to a play icon
		playPauseBtn.innerHTML = playIcon;
	});
}

let seekbar = document.querySelector("#seekbar");
// Add a timeupdate event listener to the music element
music.addEventListener("timeupdate", function () {
	// Check if the music duration is not NaN or undefined
	if (music.duration) {
		let currentDuration = document.querySelector(".current-duration");
		let position = (music.currentTime / music.duration) * 100;
		seekbar.value = position; // Update the seekbar's value
		seekbar.style.setProperty("--seek-before-width", position + "%");
		currentDuration.innerText = formatDuration(music.currentTime);
	}
});

music.addEventListener("ended", function () {
	// Check if the repeat button is active
	if (repeatBtn.getAttribute("data-repeat") === "true") {
		// If active, play the music again
		playMusic();
	} else {
		// If not active, pause the music
		pauseMusic();
	}
});

// Add event listener to hide the thumb when mouse is out of the seekbar
seekbar.addEventListener("mouseout", function () {
	seekbar.style.setProperty("--thumb-display", "none");
});

// Add event listener to show the thumb when mouse is moving over the seekbar
seekbar.addEventListener("mousemove", function () {
	seekbar.style.setProperty("--thumb-display", "block");
});

// Add event listener to update the current time of the music when the seekbar value changes
seekbar.addEventListener("input", function () {
	music.currentTime = music.duration * (seekbar.value / 100);
});

// Select the shuffle button element
let shuffleBtn = document.querySelector(".shuffle-btn");

// Select the repeat button element
let repeatBtn = document.querySelector(".repeat-btn");

// Function to toggle the button state and handle the other button
function toggleButton(button, attribute, otherButton, otherAttribute) {
	// Check if the button attribute is "false"
	if (button.getAttribute(attribute) === "false") {
		// Change the button color to indicate it is active
		button.style.color = "#ff7f11";
		// Set the button attribute to "true"
		button.setAttribute(attribute, "true");

		// Check if the other button attribute is "true"
		if (otherButton.getAttribute(otherAttribute) === "true") {
			// Click the other button to deactivate it
			otherButton.click();
		}
	} else {
		// Change the button color to indicate it is inactive
		button.style.color = "#000";
		// Set the button attribute to "false"
		button.setAttribute(attribute, "false");
	}
}

// Add a click event listener to the shuffle button
shuffleBtn.addEventListener("click", function () {
	// Call the toggleButton function to toggle the shuffle button state and handle the repeat button
	toggleButton(shuffleBtn, "data-shuffle", repeatBtn, "data-repeat");
});

// Add a click event listener to the repeat button
repeatBtn.addEventListener("click", function () {
	// Call the toggleButton function to toggle the repeat button state and handle the shuffle button
	toggleButton(repeatBtn, "data-repeat", shuffleBtn, "data-shuffle");
});

// Add a click event listener to the play/pause button
playPauseBtn.addEventListener("click", function () {
	// Check if the music is currently playing
	if (isPlaying) {
		// Pause the music
		pauseMusic();
	} else {
		// Play the music
		playMusic();
	}
});

// Add event listener for keydown event
document.addEventListener("keydown", function (e) {
	// Check if the target element is an input, if so, return
	if (e.target.matches("input")) return;

	// Check the key that was pressed
	if (e.key === " ") {
		e.preventDefault();
		// If spacebar is pressed, toggle play/pause
		if (isPlaying) {
			pauseMusic();
		} else {
			playMusic();
		}
	}
	if (e.key === "ArrowRight") {
		// If right arrow key is pressed, skip forward 5 seconds
		music.currentTime += 5;
	}
	if (e.key === "ArrowLeft") {
		// If left arrow key is pressed, skip backward 5 seconds
		music.currentTime -= 5;
	}
	if (e.key === "m") {
		// If 'm' key is pressed, trigger volume button click
		volumeBtn.click();
	}
	if (e.key === "f") {
		// If 'f' key is pressed, trigger like button click
		likeBtn.click();
	}
	if (e.key === "r") {
		// If 'r' key is pressed, trigger repeat button click
		repeatBtn.click();
	}
	if (e.key === "s") {
		// If 's' key is pressed, trigger shuffle button click
		shuffleBtn.click();
	}
	if (e.key === "p") {
		// If 'p' key is pressed, trigger add to playlist button click
		addToPlaylistBtn.click();
	}
});

let volumeBtn = document.querySelector(".volume-btn");
let volume = document.querySelector("#volume");

// Function to mute the music
function mute() {
	// Save the current volume value to local storage
	localStorage.setItem("volume", volume.value);
	// Change the volume button icon to indicate it is muted
	volumeBtn.innerHTML = '<i class="fa-regular fa-volume-xmark"></i>';
	// Set the volume value to 0
	volume.value = 0;
	// Set the music volume to 0
	music.volume = 0;
	// Update the volume range input style
	volume.style.setProperty("--volume-before-width", volume.value + "px");
}

// Function to adjust the volume
function adjustVolume(volumeValue) {
	// Update the volume range input style
	volume.style.setProperty("--volume-before-width", volumeValue + "px");
	// Set the music volume based on the volume value
	music.volume = volumeValue / 100;
	// Update the volume range input value
	volume.value = volumeValue;

	// Change the volume button icon based on the volume value
	if (volumeValue < 50) {
		volumeBtn.innerHTML = '<i class="fa-regular fa-volume-low"></i>';
	} else {
		volumeBtn.innerHTML = '<i class="fa-regular fa-volume"></i>';
	}
	console.log("unmuted");
}

// Add a click event listener to the volume button
volumeBtn.addEventListener("click", function () {
	// Check if the volume value is 0 or muted
	if (volume.value <= 0) {
		// If muted, adjust the volume to the previously saved volume value
		adjustVolume(localStorage.getItem("volume"));
	} else {
		// If not muted, mute the music
		mute();
	}
});

// Add an input event listener to the volume range input
volume.addEventListener("input", function () {
	// Check if the volume value is 0 or muted
	if (volume.value <= 0) {
		// If muted, mute the music
		mute();
	} else {
		// If not muted, save the current volume value to local storage and adjust the volume
		localStorage.setItem("volume", volume.value);
		adjustVolume(volume.value);
	}
	// Update the volume range input title with the current volume percentage
	volume.title = Math.floor(volume.value) + "%";
});

// Add a mouseout event listener to the volume range input
volume.addEventListener("mouseout", function () {
	// Hide the volume range input thumb
	volume.style.setProperty("--thumb-display", "none");
});

// Add a mousemove event listener to the volume range input
volume.addEventListener("mousemove", function () {
	// Show the volume range input thumb
	volume.style.setProperty("--thumb-display", "block");
});

let addToPlaylistDialogShowBtn = document.querySelector(
	".add-to-playlist-dialog-show-btn",
);
let addToPlaylistDialog = document.querySelector("#addToPlaylistDialog");
let playlistContainer = document.querySelectorAll(".playlists");

// Function to display the playlists
async function displayPlaylists() {
	let data = await fetchPlaylists();
	playlistContainer.forEach((container) => {
		container.innerHTML = data;
	});
}

// Add click event listener to the addToPlaylistDialogShowBtn element
addToPlaylistDialogShowBtn.addEventListener("click", function () {
	// Show the add to playlist dialog
	addToPlaylistDialog.showModal();
});

addToPlaylistDialog.addEventListener("click", async function (e) {
	//Add music to playlist
	let playlistCard = e.target.closest(".playlist-card");
	if (playlistCard) {
		let playlistId = playlistCard.getAttribute("data-playlistId");
		if (await addToPlaylist(playlistId, musicId)) {
			showAlert("Music added to playlist", "success");
			await displayPlaylists();
		}
		closeDialog(addToPlaylistDialog);
	}
});

let createPlaylistForm = document.querySelector(".create-playlist-form");
createPlaylistForm.addEventListener("submit", async function (e) {
	e.preventDefault();
	let formData = new FormData(createPlaylistForm);
	if (await createPlaylist(formData)) {
		showAlert("Playlist created successfully", "success");
		closeDialog(createNewPlaylistDialog);
		formData.delete("playlist_cover");
		await displayPlaylists();
	}
});

let likeBtns = document.querySelectorAll(".like-btn");
likeBtns.forEach((btn) => {
	btn.addEventListener("click", async function () {
		console.log("like button clicked");
		let musicId = btn.getAttribute("data-musicId");
		let action = btn.getAttribute("data-liked") === "false" ? "like" : "unlike";
		if (await setLikeStatus(musicId, action)) {
			if (action === "like") {
				setLikeBtnStatus(btn, "like");
				showAlert("Music added to favourites", "success");
			} else {
				setLikeBtnStatus(btn, "unlike");
				showAlert("Music removed from favourites", "success");
			}
		}
	});
});

document.addEventListener("click", async function (e) {
	let createPlaylistDialogShowBtns = document.querySelectorAll(
		".show-create-playlist-dialog-btn",
	);
	let createNewPlaylistDialog = document.querySelector(
		"#createNewPlaylistDialog",
	);

	// Add click event listener to each playlistFornShowBtn elemen
	createPlaylistDialogShowBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			// Show the create new playlist dialog
			createNewPlaylistDialog.showModal();
		});
	});

	let startPlayBtn = e.target.closest(".start-play-music");
	if (startPlayBtn) {
		// Get the musicId attribute from the clicked button
		let musicId = startPlayBtn.getAttribute("data-musicId");
		// If the music is already loaded
		if (isMusicLoaded(musicId)) {
			// If the music is currently playing
			if (isPlaying) {
				// Pause the music
				pauseMusic();
			} else {
				// Play the music
				playMusic();
			}
		} else {
			// If the music is not loaded, load it
			await loadMusic(musicId);
			// Play the music
			playMusic();
		}
	}
});

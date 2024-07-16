let closeBtn = document.querySelectorAll(".close-dialog-btn");

function closeDialog(dialog) {
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

let dialog = document.querySelectorAll("dialog");
dialog.forEach((d) => {
	d.addEventListener("close", function (e) {
		closeDialog(d);
	});
});

//all api calls

//Function to like or dislike a music
async function setLikeStatus(musicId, status) {
	try {
		const response = await fetch("/WEB-PROJECT/modules/addToFavourite.php", {
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
		const response = await fetch("/WEB-PROJECT/modules/addToPlaylist.php", {
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
			alert("The music is already in the playlist!");
			return false;
		} else {
			alert("Something went wrong! " + data.message);
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
		const response = await fetch("/WEB-PROJECT/modules/createPlaylist.php", {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		if (data.status === "success") {
			return true;
		} else {
			alert("Something went wrong! " + data.message);
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
		const response = await fetch("/WEB-PROJECT/modules/getPlaylist.php", {
			method: "POST",
		});
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Error fetching playlists:", error);
		return "";
	}
}

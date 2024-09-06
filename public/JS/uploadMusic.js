let dragDropArea = document.querySelector(".drag-drop-area");
let songInput = document.querySelector("#songInput");
let dragDropText = document.querySelector(".drag-drop-text");
let uploadMusicForm = document.querySelector("#uploadMusicForm");
let uploadDialogShowBtn = document.querySelector(".upload-music-page-show-btn");
let uploadDialog = document.querySelector("#uploadMusicDialog");

uploadDialogShowBtn.addEventListener("click", function () {
	uploadDialog.showModal();
});

dragDropArea.addEventListener("dragover", function (e) {
	e.preventDefault();
	dragDropArea.style.opacity = "0.5";
});

dragDropArea.addEventListener("dragleave", function () {
	dragDropArea.style.opacity = "1";
});

function checkMusicFileType(file) {
	let musicTypes = [
		"audio/mp3",
		"audio/mpeg",
		"audio/mpeg3",
		"audio/x-mpeg-3",
		"audio/mp4",
		"audio/x-m4a",
	];
	if (musicTypes.includes(file.type)) {
		return true;
	} else {
		return false;
	}
}

dragDropArea.addEventListener("drop", function (e) {
	e.preventDefault();
	let file = e.dataTransfer.files[0];
	if (checkMusicFileType(file)) {
		songInput.files = e.dataTransfer.files;
		console.log(songInput.files);
		dragDropText.innerHTML = songInput.files[0].name;
	} else {
		showAlert("Only music files are allowed", "error");
	}
	dragDropArea.style.opacity = "1";
});

dragDropArea.addEventListener("click", function () {
	songInput.click();
});

songInput.addEventListener("change", function () {
	dragDropText.innerHTML = songInput.files[0].name;
	if (!checkMusicFileType(songInput.files[0])) {
		showAlert("Only music files are allowed", "error");
		dragDropText.innerHTML =
			"<i class='fa-solid fa-upload'></i> <p>Drag and drop your music here</p>";
	}
});

uploadMusicForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let formData = new FormData(uploadMusicForm);
	fetch(baseUrl + "/modules/uploadMusic.php", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status == "success") {
				showAlert("Music uploaded successfully", "success");
				uploadMusicForm.reset();
				closeDialog(uploadMusicForm.parentElement.parentElement);
			} else {
				showAlert("Something went wrong!", "error");
			}
		});
});

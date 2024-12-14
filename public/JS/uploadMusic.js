console.log("uploadMusic.js loaded");
let dragDropArea = document.querySelector(".music-upload-area");
let uploadMusicText = document.querySelector(".music-upload-text");
let uploadMusicForm = document.querySelector("#uploadMusicForm");

dragDropArea.addEventListener("dragover", function (e) {
	e.preventDefault();
	dragDropArea.style.borderColor = "var(--primary-color) ";
	uploadMusicText.style.color = "var(--primary-color) ";
});

dragDropArea.addEventListener("dragleave", function (e) {
	e.preventDefault();
	dragDropArea.style.borderColor = "#a8a8a8";
	uploadMusicText.style.color = "#a8a8a8";
});

dragDropArea.addEventListener("drop", function (e) {
	e.preventDefault();
	let input = dragDropArea.querySelector("input[type='file']");
	uploadMusic(input, e.dataTransfer.files[0]);
	dragDropArea.style.borderColor = "#a8a8a8";
	uploadMusicText.style.color = "#a8a8a8";
});

function checkMusicFileType(file) {
	const musicTypes = [
		"audio/mp3",
		"audio/mpeg",
		"audio/mpeg3",
		"audio/x-mpeg-3",
		"audio/mp4",
		"audio/x-m4a",
	];
	const musicExtensions = [
		".mp3",
		".mpeg",
		".mpeg3",
		".mp4",
		".m4a",
	];
	const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
	if (musicTypes.includes(file.type) && musicExtensions.includes(fileExtension)) {
		return true;
	} else {
		return false;
	}
}

function checkLyricsFileType(file) {
	const lyricsExtensions = [
		".lrc",
	];
	const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
	if (lyricsExtensions.includes(fileExtension)) {
		return true;
	} else {
		return false;
	}
}

uploadMusicForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let submitBtn = uploadMusicForm.querySelector("button[type='submit");
	setBtnStatus(submitBtn, "loading", "Uploading Music");
	let formData = new FormData(uploadMusicForm);
	if (!validateUploadMusicForm(formData)) {
		setBtnStatus(submitBtn, "normal", "Upload Music");
		return;
	}
});


function validateUploadMusicForm(formData) {
	if (formData.get("title") === "") {
		showAlert("Title is required", "error");
		return false;
	}
}

document.addEventListener("change", function (e) {
	if (e.target.closest("#lyricsFile")) {
		let file = e.target.files[0];
		if (checkLyricsFileType(file)) {
			uploadedFileName(e.target, file.name);
			console.log(file);
		} else {
			showAlert("Only .lrc files are allowed", "error");
		}
	}
	if (e.target.closest("#musicFile")) {
		console.log(e.target.files[0]);
		uploadMusic(e.target, e.target.files[0]);
	}
});


function uploadMusic(fileInput, file) {
	if (checkMusicFileType(file)) {
		uploadedFileName(fileInput, file.name);
	} else {
		showAlert("Only music files are allowed", "error");

	}
}
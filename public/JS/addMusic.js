document.addEventListener("click", function (e) {
	if (e.target.matches("#uploadMusicShowBtn")) {
		console.log("uploadMusicShowBtn clicked");
		document.getElementById("uploadMusic").showModal();
	}
});

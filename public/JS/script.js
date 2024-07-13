let closeBtn = document.querySelectorAll(".close-dialog-btn");

closeBtn.forEach((btn) => {
	btn.addEventListener("click", function () {
		btn.parentElement.close();
	});
});

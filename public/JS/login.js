let loginBtn = document.querySelector("#loginBtn");
let loginFormDialog = document.querySelector("#loginFormDialog");
let loginForm = document.querySelector("#loginForm");
let loginSubmitBtn = document.querySelector(".login-submit");

loginForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let data = new FormData(loginForm);
	console.log(data);
	fetch("/WEB-PROJECT/modules/loginUser.php", {
		method: "POST",
		body: data,
	})
		.then((response) => response.text())
		.then((data) => {
			if (data == "success") {
				window.location.href = "/WEB-PROJECT/pages/musicPlayer/playerHome.php";
			} else {
				alert(data);
			}
		});
});

loginFormDialog.showModal();

loginBtn.addEventListener("click", function () {
	loginFormDialog.showModal();
});

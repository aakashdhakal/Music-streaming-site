// Select all elements with class "login-form-show-btn"
let loginBtns = document.querySelectorAll(".login-form-show-btn");

// Select the element with id "loginFormDialog"
let loginFormDialog = document.querySelector("#loginFormDialog");

// Select the element with id "loginForm"
let loginForm = document.querySelector("#loginForm");

// Select the element with class "login-submit"
let loginSubmitBtn = document.querySelector(".login-submit");

// Add event listener to the login form when it is submitted
loginForm.addEventListener("submit", function (e) {
	e.preventDefault(); // Prevent the default form submission behavior

	// Create a new FormData object with the login form data
	let data = new FormData(loginForm);
	console.log(data);

	// Send a POST request to baseUrl + "/modules/loginUser.php" with the form data
	fetch(baseUrl + "/modules/loginUser.php", {
		method: "POST",
		body: data,
	})
		.then((response) => response.text()) // Get the response as text
		.then((data) => {
			if (data == "success") {
				// If the response is "success", redirect to baseUrl + "/index.php"
				window.location.href = baseUrl + "/index.php";
			} else {
				// If the response is not "success", display an alert with the response data
				alert(data);
			}
		});
});

// Add click event listener to each login button
loginBtns.forEach((btn) => {
	btn.addEventListener("click", function () {
		// Show the login form dialog
		loginFormDialog.showModal();
	});
});

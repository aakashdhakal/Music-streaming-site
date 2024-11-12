function loginUser(loginForm) {
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
				window.location.href = baseUrl;
			} else {
				// If the response is not "success", display an alert with the response data
				alert(data);
			}
		});
}

document.addEventListener("click", (e) => {
	// Check if the clicked element or its ancestor has the ID 'closeLoginForm'
	if (e.target.closest(".login-form-show-btn")) {
		// Close the login form dialog
		document.querySelector("#loginForm").showModal();
	}
});

document.addEventListener("submit", (e) => {
	// Check if the submitted form has the ID 'registerForm'
	if (e.target.matches(".login-form")) {
		// Prevent the default form submission
		e.preventDefault();
		// Call the registerUser function with the submitted form
		loginUser(e.target);
	}
});

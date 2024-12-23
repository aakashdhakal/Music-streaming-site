document.addEventListener("DOMContentLoaded", () => {
	const signupFormElement = document.querySelector("#signupForm");
	const loginFormElement = document.querySelector("#loginForm");
	const otpInputs = document.querySelectorAll(".otp-group input");
	const otpPattern = /^[0-9]{1}$/;
	const registerData = new FormData();

	document.addEventListener("click", async (e) => {
		if (e.target.closest(".signup-form-show-btn")) {
			signupFormElement.showModal();
		}
		if (e.target.closest("#loginFromSignup")) {
			signupFormElement.close();
			loginFormElement.showModal();
		}
		if (e.target.closest(".resend")) {
			setBtnStatus(e.target, "loading", "Resending OTP");
			await sendOtp(registerData.get("email"));
			setBtnStatus(e.target, "normal", "");
			resendOtpCounter();
		}
	});

	document.addEventListener("submit", async (e) => {
		e.preventDefault();
		const form = e.target.closest("form");
		const btn = e.target.querySelector("button[type='submit']");

		if (!form) return;

		if (await validateForm(form)) {
			const formData = new FormData(form);

			switch (form.className) {
				case "signup-form":
					setBtnStatus(btn, "loading", "Sending OTP");
					handleSignupForm(form, formData);
					break;
				case "otp-verify":
					setBtnStatus(btn, "loading", "Verifying OTP");
					handleOtpVerifyForm(form);
					break;
				case "personal-info":
					setBtnStatus(btn, "loading", "Signing up");
					handlePersonalInfoForm(form, formData);
					break;
			}
		}
	});

	otpInputs.forEach((input, index) => {
		input.addEventListener("input", (e) => {
			if (!otpPattern.test(e.target.value)) {
				e.target.value = "";
			} else if (index < otpInputs.length - 1) {
				otpInputs[index + 1].focus();
			}
		});

		input.addEventListener("keydown", (e) => {
			if (e.key === "Backspace" && index > 0 && e.target.value.length === 0) {
				otpInputs[index - 1].focus();
			}
		});
	});

	function handleSignupForm(form, formData) {
		const email = formData.get("email");
		const username = formData.get("username");

		registerData.append("email", email);
		registerData.append("username", username);
		registerData.append("password", formData.get("password"));

		sendOtp(email, username);
		resendOtpCounter();

		form.style.display = "none";
		form.nextElementSibling.style.display = "flex";
		hideError();
	}

	function handleOtpVerifyForm(form) {
		form.style.display = "none";
		form.nextElementSibling.style.display = "flex";
		hideError();
	}

	async function handlePersonalInfoForm(_form, formData) {
		registerData.append(
			"dob",
			formatDate(
				formData.get("year"),
				formData.get("month"),
				formData.get("day"),
			),
		);
		registerData.append("profile_pic", formData.get("profile_pic"));
		registerData.append("firstName", formData.get("firstName"));
		registerData.append("lastName", formData.get("lastName"));

		if (await registerUser(registerData)) {
			loginUser(signupFormElement);
		}
	}

	function combineOtp(otpInputs) {
		return Array.from(otpInputs)
			.map((input) => input.value)
			.join("");
	}

	function resendOtpCounter() {
		let counter = 59;
		const resendBtn = document.querySelector(".resend");

		resendBtn.style.color = "gray";
		resendBtn.disabled = true;

		const interval = setInterval(() => {
			counter--;
			resendBtn.innerText = `${counter}s`;

			if (counter === 0) {
				clearInterval(interval);
				resendBtn.style.color = "#ff6a3a";
				resendBtn.innerText = "Resend";
				resendBtn.disabled = false;
			}
		}, 1000);
	}

	async function validateForm(form) {
		const formClass = form.className;
		let isValid = true;

		switch (formClass) {
			case "signup-form":
				isValid = await validateSignupForm(form);
				break;
			case "otp-verify":
				isValid = await validateOtpForm(form);
				break;
			case "personal-info":
				isValid = validatePersonalInfoForm(form);
				break;
		}

		return isValid;
	}

	async function validateSignupForm(form) {
		const password = form.querySelector('input[name="password"]').value;
		const confirmPassword = form.querySelector(
			'input[name="confirmPassword"]',
		).value;
		const username = form.querySelector('input[name="username"]').value;
		const email = form.querySelector('input[name="email"]').value;

		if (!username || !email || !password || !confirmPassword) {
			showError(form, "Please fill in all fields");
			return false;
		}
		if (!(await checkUsername(username))) {
			showError(form, "Username already exists");
			return false;
		}
		if (password !== confirmPassword) {
			showError(form, "Passwords do not match");
			return false;
		}
		if (!validatePassword(password)) {
			showError(
				form,
				"Password must contain at least 8 characters, one uppercase letter and one number",
			);
			return false;
		}
		if (!validateUsername(username)) {
			showError(
				form,
				"Username must be between 6 and 12 characters and cannot contain special characters",
			);
			return false;
		}
		if (!validateEmail(email)) {
			showError(form, "Invalid email address");
			return false;
		}

		return true;
	}

	async function validateOtpForm(form) {
		const otpInputs = form.querySelectorAll(".otp-group input");
		const otp = combineOtp(otpInputs);

		if (otp.length !== 6) {
			showError(form, "Please fill in all fields");
			return false;
		}
		if (!(await checkOtp(otp, registerData.get("email")))) {
			showError(form, "Invalid OTP");
			return false;
		}

		return true;
	}

	function validatePersonalInfoForm(form) {
		const year = form.querySelector('input[name="year"]').value;
		const month = form.querySelector('input[name="month"]').value;
		const day = form.querySelector('input[name="day"]').value;
		const firstName = form.querySelector('input[name="firstName"]').value;
		const lastName = form.querySelector('input[name="lastName"]').value;

		if (!year || !month || !day || !firstName || !lastName) {
			showError(form, "Please fill in all fields");
			return false;
		} else if (!validateDate(year, month, day)) {
			showError(form, "Invalid date of birth");
			return false;
		}

		return true;
	}

	function validateDate(year, month, day) {
		const date = new Date(year, month - 1, day);
		const currentDate = new Date();

		if (date > currentDate) {
			return false;
		} else if (year < 1900) {
			return false;
		} else if (
			date.getFullYear() != year ||
			date.getMonth() != month - 1 ||
			date.getDate() != day
		) {
			return false;
		}

		return true;
	}

	function validatePassword(password) {
		const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		return pattern.test(password);
	}

	function validateUsername(username) {
		const pattern = /^[a-zA-Z0-9]{6,12}$/;
		return pattern.test(username);
	}

	function validateEmail(email) {
		const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return pattern.test(email);
	}

	function formatDate(year, month, day) {
		month = String(month).padStart(2, "0");
		day = String(day).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}
});

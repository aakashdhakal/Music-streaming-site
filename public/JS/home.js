let profileDropdownBtn = document.querySelector(".profile-btn");
let profileDropdownWindow = document.querySelector("#profileWindow");

profileDropdownBtn.addEventListener("click", () => {
	profileDropdownWindow.classList.toggle("openProfileWindow");
});

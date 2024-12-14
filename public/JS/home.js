console.log("home.js loaded");
document.addEventListener("click", (e) => {
	// Check if the clicked element or its ancestor has the ID 'nextInContainer'
	if (e.target.closest("#nextInContainer")) {
		// Find the song card container within the parent element
		let cardContainer = e.target
			.closest("#nextInContainer")
			.parentElement.querySelector(".song-card-container");
		// Scroll the container to the right by its own width
		cardContainer.scrollLeft += cardContainer.offsetWidth;
	}

	// Check if the clicked element or its ancestor has the ID 'prevInContainer'
	if (e.target.closest("#prevInContainer")) {
		// Find the song card container within the parent element
		let cardContainer = e.target
			.closest("#prevInContainer")
			.parentElement.querySelector(".song-card-container");
		// Scroll the container to the left by its own width
		cardContainer.scrollLeft -= cardContainer.offsetWidth;
	}
});
// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
}

// Debounced search input handler
const handleSearchInput = debounce(async (e) => {
	// Check if the text on search bar has changed
	if (e.target.id === "search") {
		// Get the search value
		let searchValue = e.target.value;
		// If the search value is empty, load the home page
		if (searchValue === "") {
			document.title = "Sangeet - The Heartbeat of Music";
			await loadPageDynamic("/");
		} else {
			document.title = "Sangeet - Search ";
			await loadSearchPage(searchValue);
		}
	}
}, 300); // Adjust the debounce delay as needed (300ms in this example)

document.addEventListener("input", handleSearchInput);

document.addEventListener("reset", async (e) => {
	// Check if the clicked element or its ancestor has the id search
	if (e.target.closest(".search-form")) {
		// Prevent the reset event from triggering loadPageDynamic if input event has already handled it
		e.preventDefault();
		document.querySelector("#search").value = "";
		document.title = "Sangeet - The Heartbeat of Music";
		await loadPageDynamic("/");
	}
});

async function loadSearchPage(searchValue) {
	document.title = "Sangeet - Search ";
	await loadPageDynamic("/search/" + encodeURIComponent(searchValue));
}

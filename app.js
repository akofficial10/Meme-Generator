document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.querySelector(".generate-button");
  const memeImage = document.querySelector(".meme-image");
  const memeTitle = document.querySelector(".meme-title");
  const author = document.querySelector(".author");
  const placeholder = document.getElementById("placeholder");
  const loadingSpinner = document.querySelector(".loading-spinner");

  // Function to fetch meme data
  async function fetchMeme() {
    try {
      // Show loading state
      generateBtn.disabled = true;
      loadingSpinner.classList.remove("hidden");
      placeholder.style.display = "none";
      memeImage.classList.remove("loaded");

      const response = await fetch("https://meme-api.com/gimme");
      const data = await response.json();

      // Update DOM with new meme
      memeImage.onload = () => {
        memeImage.classList.add("loaded");
        loadingSpinner.classList.add("hidden");
        generateBtn.disabled = false;
      };

      memeImage.src = data.url;
      memeImage.alt = data.title;
      memeTitle.textContent = data.title;
      author.textContent = `Author: ${data.author || "Unknown"}`;

      // Hide placeholder when image is loaded
      memeImage.onload();
    } catch (error) {
      console.error("Error fetching meme:", error);
      memeTitle.textContent = "Failed to load meme. Try again!";
      author.textContent = "";
      loadingSpinner.classList.add("hidden");
      generateBtn.disabled = false;
      placeholder.style.display = "flex";
    }
  }

  // Initial fetch
  fetchMeme();

  // Button click event
  generateBtn.addEventListener("click", fetchMeme);

  // Add keyboard shortcut (Spacebar) to generate new meme
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !generateBtn.disabled) {
      e.preventDefault();
      fetchMeme();
    }
  });
});

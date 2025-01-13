const generateBtn = document.querySelector('.generate-button');
const memeTitle = document.querySelector('.meme-title');
const memeImage = document.querySelector('.meme-image');
const authorOutput = document.querySelector('.author');

function generateMeme() {
     fetch("https://meme-api.com/gimme/wholesomememes")
       .then((res) => res.json())
       .then((data) => {
         const { author, title, url } = data;
         authorOutput.innerText = `Meme by: ${author}`;
         memeTitle.innerText = title;
         memeImage.src = url;
       });
}

generateBtn.addEventListener("click", () => {
    generateMeme();
});
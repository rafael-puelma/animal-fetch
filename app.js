// API endpoints for animal data/image url.
const animalUrls = {
  cat: "https://aws.random.cat/meow",
  dog: "https://random.dog/woof.json",
  fox: "https://randomfox.ca/floof/",
};

// Get elements that we interact with.
const fetchButtonEl = document.querySelector(".fetch-animal-button");
const animalSelectEl = document.querySelector(".animal-select");
const animalImageEl = document.querySelector(".animal-image img");
const favoriteImagesEl = document.querySelector(".favorite-images");

// Fetch image on click on button.
fetchButtonEl.addEventListener("click", () => {
  // Get animal api url.
  const animalType = animalSelectEl.value;
  const animalUrl = animalUrls[animalType];

  // Fetch animal image url and display it.
  fetch(animalUrl)
    .then((response) => response.json())
    .then((animalData) => {
      let imageUrl = "";
      if (animalType === "cat") {
        imageUrl = animalData.file;
      } else if (animalType === "dog") {
        imageUrl = animalData.url;
      } else if (animalType === "fox") {
        imageUrl = animalData.image;
      }
      animalImageEl.src = imageUrl;
    });
});

let favoritBilder = [];

animalImageEl.addEventListener("click", (e) => {
  // Display favorite image.
  displayFavoriteImage(e.target.src);

  favoritBilder.push(e.target.src);
  console.log(favoritBilder);
  localStorage.setItem("favorites", JSON.stringify(favoritBilder));
});

// Display favorite images.
function displayFavoriteImage(imageSrc) {
  const newFavoriteEl = document.createElement("img");
  newFavoriteEl.src = imageSrc;
  favoriteImagesEl.prepend(newFavoriteEl);
  favoriteImagesEl.scrollTo(0, 0);
}

let favoritBildLista = localStorage.getItem("favorites");

let favoritLista = JSON.parse(favoritBildLista);
favoritLista.forEach((bilder) => {
  // "bilder "är dett namn vi har valt så att vi vet vad det vi gör
  displayFavoriteImage(bilder);
});

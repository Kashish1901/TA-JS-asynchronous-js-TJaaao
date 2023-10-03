const input = document.querySelector("input");
let root = document.querySelector("ul");

const url = `https://api.unsplash.com/photos/?client_id=h1NCeCvRf97QNOtpE24VH3w8gF6KI_CateLkSp1UcIY`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?&query=${query}&client_id=h1NCeCvRf97QNOtpE24VH3w8gF6KI_CateLkSp1UcIY`;

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject("Something went wrong!");
    xhr.send();
  });
}

function displayImages(images) {
  root.innerHTML = "";
  images.forEach((image) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = image.urls.thumb;
    li.append(img);
    root.append(li);
  });
}

fetch(url)
  .then(displayImages)
  .catch((error) => console.log("error"));

function handleSearch(event) {
  if (event.keyCode === 13 && input.value) {
    fetch(getSearchUrl(input.value))
      .then((searchResult) => {
        displayImages(searchResult.results);
      })
      .catch((error) => console.log("error"));
    input.value = "";
  }
}

input.addEventListener("keyup", handleSearch);

const input = document.querySelector("input");
let root = document.querySelector("ul");

const url = `https://api.unsplash.com/photos/?client_id=h1NCeCvRf97QNOtpE24VH3w8gF6KI_CateLkSp1UcIY`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?&query=${query}&client_id=h1NCeCvRf97QNOtpE24VH3w8gF6KI_CateLkSp1UcIY`;

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.log("Something went wrong ...");
  };
  xhr.send();
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

fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && input.value) {
    fetch(getSearchUrl(input.value), (searchResult) => {
      displayImages(searchResult.results);
    });
    input.value = "";
  }
}

input.addEventListener("keyup", handleSearch);

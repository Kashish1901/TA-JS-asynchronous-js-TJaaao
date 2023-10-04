let input = document.querySelector("input");
let root = document.querySelector("ul");

function displayUI(news) {
  let li = document.createElement("li");
  let img = document.createElement("img");
  img.src = news.imageUrl;
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.innerText = news.title;
  let p = document.createElement("p");
  p.innerText = news.summary;
  let button = document.createElement("button");
  button.src = news.url;
  li.classList.add(flex);
  div.append(h3, p, button);
  li.append(img, div);
  root.append(li);
}

input.addEventListener("keyup", handleSearch);

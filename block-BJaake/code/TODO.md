## Spaceflight News App

- Create a new search website using the api link given below
- Display all latest news in the start
- Each news should contain image, title, source and read more button
- Clicking on read me should take the user to the news url
- It will also contain a dropdown with multiple news sources (`newsSite` property from the news object)
- Selecting any specific news source will display news from that specific source only.

- Use browser function `fetch` to get data

## API Details:

- `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`

For more information you can check [Spaceflight News API](https://spaceflightnewsapi.net/) website.

## DEMO

![Spaceflight News App](https://github.com/nnnkit/ac-js-images/blob/master/async/spaceflight.gif?raw=true)

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

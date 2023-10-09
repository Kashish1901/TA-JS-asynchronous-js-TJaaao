let newsElm = document.querySelector(".news");
let select = document.querySelector("select");
let allNews = [];
let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let main = document.querySelector(".main");
let errorElm = document.querySelector(".error");

function handleErrorMessage(mssg = "Something went wrong...") {
  main.style.display = "none";
  errorElm.style.display = "block";
  errorElm.innerText = mssg;
}

function handleSpinner(status = false) {
  if (status) {
    newsElm.innerHTML = `<div class="donut spinner"></div>`;
  }
}

function renderNews(news) {
  newsElm.innerHTML = "";
  news.forEach((newsItem) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = newsItem.imageUrl;
    img.alt = newsItem.imageUrl;
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.classList.add("source");
    span.innerText = newsItem.newsSite;
    let h3 = document.createElement("h3");
    h3.innerText = newsItem.title;
    let a = document.createElement("a");
    a.href = newsItem.url;
    let button = document.createElement("button");
    button.innerText = `Read More`;
    a.append(button);
    div.append(span, h3, a);
    li.classList.add("flex");
    li.append(img, div);
    newsElm.append(li);
  });
}

function displayOptions(sources) {
  sources.forEach((source) => {
    let option = document.createElement("option");
    select.append(option);
    option.innerText = source;
    option.value = source;
  });
}

function init() {
  handleSpinner(true);
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error happened: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((news) => {
      handleSpinner();
      allNews = news;
      renderNews(news);
      let allSOurces = [...new Set(news.map((n) => n.newsSite))];
      displayOptions(allSOurces);
    })
    .catch((error) => {
      handleErrorMessage(error);
    })
    .finally(() => handleSpinner());
}

select.addEventListener("change", (event) => {
  let source = event.target.value.trim();
  let filteredNews;
  if (source) {
    filteredNews = allNews.filter((news) => news.newsSite === source);
  } else {
    filteredNews = allNews;
  }

  renderNews(filteredNews);
});

if (navigator.onLine) {
  init();
} else {
  handleErrorMessage("Check your internet connection❌");
}

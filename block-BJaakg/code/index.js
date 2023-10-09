const root = document.querySelector(".container");
const url = `https://www.anapioficeandfire.com/api/books`;

function booksUI(books) {
  books.forEach((book) => {
    let li = document.createElement("li");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let button = document.createElement("button");
    h2.innerText = book.name;
    p.innerText = book.authors;
    button.innerText = book.characters;
    li.append(h2, p, button);
    root.append(li);
  });
}

fetch(url)
  .then((res) => {
    res.json();
  })
  .then((books) => {
    booksUI(books);
  });

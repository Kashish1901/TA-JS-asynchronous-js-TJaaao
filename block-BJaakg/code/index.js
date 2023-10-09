function main() {
  const booksUL = document.querySelector(".container");
  const url = `https://www.anapioficeandfire.com/api/books`;
  let modalWindow = document.querySelector(".modal_window");
  let modalClose = document.querySelector(".modal_close");
  const charactersUL = document.querySelector("characters");

  function handleSpinner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class="donut"></div>`;
    }
  }

  function displayCharacters(characters) {
    Promise.all(
      characters.map((character) => fetch(character).then((res) => res.json()))
    ).then((charactersData) => {
      charactersUL.innerHTML = " ";
      charactersData.forEach((ch) => {
        let li = document.createElement("li");
        li.innerText = `${ch.name} : (${ch.aliases.join(" ")})`;
        charactersUL.append(li);
      });
    });
  }

  function displayBooks(books) {
    booksUL.innerHTML = " ";
    books.forEach((book) => {
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      let p = document.createElement("p");
      let button = document.createElement("button");
      h2.innerText = book.name;
      p.innerText = book.authors;
      button.innerText = `Show characters(${book.characters.length})`;
      button.addEventListener("click", () => {
        modalWindow.style.display = "block";
        displayCharacters(book.characters);
        modalWindow
          .querySelector(".modal_close")
          .addEventListener("click", () => {
            modalWindow.style.display = "none";
          });
      });
      li.append(h2, p, button);
      booksUL.append(li);
    });
  }
  function fetchBooks() {
    handleSpinner(booksUL, true);
    fetch(url)
      .then((res) => res.json())
      .then((books) => {
        displayBooks(books);
      })
      .finally(() => {
        handleSpinner(booksUL, false);
      });
  }

  fetchBooks();
}

main();

const input = document.querySelector("input");

function handleclick() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET");
  xhr.onload = function () {};
  xhr.send();
}

input.addEventListener("keyup", handleclick);

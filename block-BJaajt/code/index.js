const input = document.querySelector("input");
const div = document.querySelector("div");
const img = document.querySelector("img");
const name = document.querySelector("h3");
const twitterUsername = document.querySelector("p");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");

function displayUI(data) {
  img.src = data.avatar_url;
  name.innerText = data.name;
  twitterUsername.innerText = data.twitter_username;
  followers.innerText = `Followers: ${data.followers}`;
  following.innerText = `Following: ${data.following}`;
}

function handleChange(event) {
  if (event.keycode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/ ${event.target.value}");
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    xhr.onerror = function () {
      console.log("Something went wrong....");
    };
    xhr.send();
    event.target.value = "";
  }
}

input.addEventListener("keyup", handleChange);

const input = document.querySelector("input");
const div = document.querySelector("div");
const img = document.querySelector("img");
const name = document.querySelector("h3");
const twitterUsername = document.querySelector("p");
const followersUL = document.querySelector(".followers");
const followingUL = document.querySelector(".following");

function fetch(url, successhHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => successhHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.log("Something went wrong....");
  };
  xhr.send();
}

function displayFollowers(username) {
  followersUL.innerHTML = "";
  fetch(
    `https://api.github.com/users/${username}/followers`,
    function (followersList) {
      let topFive = followersList.slice(0, 5);
      topFive.forEach((info) => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = info.avatar_url;
        img.alt = info.name;
        li.append(img);
        followersUL.append(li);
        followersUL.classList.add("flex");
      });
    }
  );
}

function displayFollowing(username) {
  followingUL.innerHTML = "";
  fetch(
    `https://api.github.com/users/${username}/following`,
    function (followingList) {
      let topFive = followingList.slice(0, 5);
      topFive.forEach((info) => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = info.avatar_url;
        img.alt = info.name;
        li.append(img);
        followingUL.append(li);
        followingUL.classList.add("flex");
      });
    }
  );
}

function displayUI(data) {
  img.src = data.avatar_url;
  name.innerText = data.name;
  twitterUsername.innerText = "@" + data.login;
  displayFollowers(data.login);
  displayFollowing(data.login);
}

function handleChange(event) {
  if (event.keyCode === 13 && input.value) {
    const url = "https://api.github.com/users/";
    let username = input.value;
    fetch(url + username, displayUI);
    event.target.value = "";
  }
}

input.addEventListener("keydown", handleChange);

const catImage = document.querySelector(".cats img");
const catButton = document.querySelector("button");

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      catImage.src = catInfo[0].url;
    }
  );
}

catButton.addEventListener("click", handleClick);

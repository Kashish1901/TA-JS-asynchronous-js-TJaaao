let first = new Promise((res, rej) => {
  setTimeout(() => res(1), 1000);
});
let second = new Promise((res, rej) => {
  setTimeout(() => res(2), 2000);
});

let third = new Promise((res, rej) => {
  setTimeout(() => res(3), 3000);
});

let forth = new Promise((res, rej) => {
  setTimeout(() => res(4), 4000);
});

let all = Promise.all([first, second, third, forth]).then((res) =>
  console.log(res)
);

let userName = ["getify", "prank7", "nnnkit", "Kashish1901", "piranha"];

userName.map((user) => {
  fetch(`https://api.github.com/users/${user}`)
    .then((res) => res.json())
    .then((userInfo) => console.log(userInfo.followers));
});

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);

let allSettled = Promise.allSettled([one, two, three])
  .then((res) => res.json())
  .then((info) => console.log(info));

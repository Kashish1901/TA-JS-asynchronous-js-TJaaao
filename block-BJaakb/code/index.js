function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () =>
      setTimeout(() => resolve(JSON.parse(xhr.response)), 5000);
    xhr.onerror = () => reject("Something went wrong!");
    xhr.send();
  });
}

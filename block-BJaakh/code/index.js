let input = document.querySelector(`input[type="text"]`);
let ulRoot = document.querySelector("ul");
let baseURL = `https://basic-todo-api.vercel.app/api/`;

function handleDelete(id) {
  fetch(baseURL + `todo/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    displayTodos();
  });
}

function handleToggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(baseURL + `todo/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    displayTodos();
  });
}

function handleEdit(event, id, title) {
  let input = document.createElement("input");
  input.value = title;
  input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && event.target.value) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(baseURL + `todo/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        displayTodos();
      });
    }
  });
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
}

function createUI(data) {
  ulRoot.innerHTML = " ";
  data.forEach((todo) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    li.classList.add("flex");
    input.type = "checkbox";
    input.classList.add("checkbox");
    input.checked = todo.isCompleted;
    input.addEventListener("click", () =>
      handleToggle(todo._id, todo.isCompleted)
    );
    input.setAttribute("data-id", todo._id);
    let p = document.createElement("p");
    p.innerText = todo.title;
    p.addEventListener("dblclick", (event) =>
      handleEdit(event, todo._id, todo.title)
    );
    let span = document.createElement("span");
    span.innerText = "❌";
    span.addEventListener("click", () => handleDelete(todo._id));
    span.setAttribute("data-id", todo._id);
    li.append(input, p, span);
    ulRoot.append(li);
  });
}

function displayTodos() {
  fetch(baseURL + "todo")
    .then((res) => res.json())
    .then((allTodos) => {
      createUI(allTodos.todos);
    });
}
function addTodos(event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    fetch(baseURL + "todo", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(() => {
      event.target.value = " ";
      displayTodos();
    });
  }
}

input.addEventListener("keyup", addTodos);
displayTodos();

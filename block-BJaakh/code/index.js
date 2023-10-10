let baseUrl = `https://basic-todo-api.vercel.app/api/todo`;

data = {
  todo: {
    title: "Drink Water",
    isCompleted: true,
  },
};

fetch(baseUrl, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header
});

const express = require("express");

// application instance
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(async (_, __, next) => {
  console.log("Passando sempre");
  next();
});

// fake data
const users = [
  { username: "John doe", age: 16, password: "123" },
  { username: "Max Ava", age: 18, password: "456" },
  { username: "Johhny", age: 33, password: "789" },
];

// routes
app.get("/home/:username", async (_, response) =>
  response.send(`Welcome, ${_.params.username}`)
);
// app.get("/home", async (_, response) => response.send("Not called"));

app.get("/users", async (request, response) => {
  // console.log("Chegou Depois");
  const { age } = request.query; // const age = request.query.age
  const user = users.filter((user) => user.age <= age);
  response.send(user);
});

app.get("/users/:username", async (request, response) => {
  const { username } = request.params;
  // response.send("Welcome, " + username);
  response.send(`Welcome, ${username.toLowerCase()}`);
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user !== undefined) {
    // response.send({ error: false, message: "Usuário logado com sucesso" }); // return response.send("Encontrado");
    response.redirect(`/home/${username}`);
    return;
  }
  response.redirect("/");
});

// app.post("/login", async (request, response) => {
//   const { username, password } = request.body;
//   const user = users.find((user) => {
//     if (user.username === username && user.password === password) {
//       return true;
//     }
//     return false;
//   });
//   if (user !== undefined) {
//     response.send("Encontrado"); // return response.send("Encontrado");
//     return;
//   }
//   response.send("Não achei você");
// });

// console.log("Chegou antes");

app.listen(3333, () => console.log("Server running on *:3333"));

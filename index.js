const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  { id: 1, name: "ab", number: 134 },
  { id: 2, name: "ddd", number: 1322224 },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World123!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

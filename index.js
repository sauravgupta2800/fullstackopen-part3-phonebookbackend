const { request, response } = require("express");
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

app.get("/api/info", (request, response) => {
  response.send(`<div>
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>
    </div>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

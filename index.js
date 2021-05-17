const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

const getRandomId = () => {
  return Math.floor(Math.random() * 99999);
};

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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.get("/api/info", (request, response) => {
  response.send(`<div>
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>
    </div>`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  let person = request.body;
  const { name = "", number = 0 } = person;
  if (!name || !number) {
    response.status(404).send({
      error: "Name or / and number is missing",
    });
  }
  if (persons.find((person) => person.name === name)) {
    response.status(404).send({
      error: "Name must be unique",
    });
  }
  person = {
    ...person,
    id: getRandomId(),
  };
  persons.push(person);
  response.status(201).send(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));
app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);
app.use(express.json());

const getRandomId = () => {
  return Math.floor(Math.random() * 99999);
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((personsRes) => {
    response.send(personsRes);
  });
});

app.get("/api/persons/:id", (request, response) => {
  //   const id = Number(request.params.id);
  //   const person = persons.find((person) => person.id == id);
  //   if (person) {
  //     response.send(person);
  //   } else {
  //     response.status(404).end();
  //   }
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
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
  const { name = "", number = 0 } = request.body;
  if (!name || !number) {
    response.status(404).send({
      error: "Name or / and number is missing",
    });
  }
  //   if (persons.find((person) => person.name === name)) {
  //     response.status(404).send({
  //       error: "Name must be unique",
  //     });
  //   }
  const person = new Person({ name, number });
  person.save().then((savedPerson) => {
    response.status(201).send(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

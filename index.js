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

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`<div>
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>
        </div>`);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  response.status(204).end();
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { name = "", number = 0 } = request.body;
  if (!name || !number) {
    response.status(404).send({
      error: "Name or / and number is missing",
    });
  }
  const person = new Person({ name, number });
  person.save().then((savedPerson) => {
    response.status(201).send(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const { name = "", number = 0 } = request.body;
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true }
  ).then((savedPerson) => {
    response.status(201).send(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
// handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

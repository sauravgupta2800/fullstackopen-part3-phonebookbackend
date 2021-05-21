const Person = require('../models/person');
const personRouter = require('express').Router();

personRouter.get('/', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(persons);
  });
});

personRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

personRouter.delete('/:id', (request, response, next) => {
  response.status(204).end();
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

personRouter.post('/', (request, response, next) => {
  const { name = '', number = 0 } = request.body;
  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => {
      response.status(201).send(savedPerson);
    })
    .catch((error) => next(error));
});

personRouter.put('/:id', (request, response, next) => {
  const { name = '', number = 0 } = request.body;
  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true })
    .then((savedPerson) => {
      response.status(201).send(savedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personRouter;
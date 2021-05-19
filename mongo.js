const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

const url = `mongodb+srv://fullstack:${password}@cluster0.dcxbw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(
    `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
  );

  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      const { name, number } = person;
      console.log(name + " " + number);
    });
    mongoose.connection.close();
  });
});

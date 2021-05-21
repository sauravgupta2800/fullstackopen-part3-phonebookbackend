const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },

  number: {
    type: Number,
    minlength: 8,
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);

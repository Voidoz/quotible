const R = require('ramda');
const mongoose = require('mongoose');

// We make the Schema here
const { Schema } = mongoose;

// Here is our data model
const quoteSchema = new Schema({
  franchise: { type: String },
  installment: { type: String },
  character: { type: String, required: true },
  quote: { type: String, required: true },
});

quoteSchema.methods.hide = function() {
  return R.omit(['__v', '_id'], this.toObject());
};

// We define the data model here
const Quote = mongoose.model('Quote', quoteSchema);

// And then we export it
module.exports = Quote;

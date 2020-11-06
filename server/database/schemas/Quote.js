const R = require('ramda');
const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

// We make the Schema here
const { Schema } = mongoose;

// Here is our data model
const quoteSchema = new Schema({
  franchise: { type: String, required: true },
  installment: { type: String },
  charachter: { type: String },
  quote: { type: String, required: true },
});

// Here we tell Mongoose how we want to treat the schema
MongooseAutoIncrementID.initialise('counters');

quoteSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'Quote',
  field: 'quote',
  incrementBy: 1,
  startAt: 1,
  unique: true,
  nextCount: false,
  resetCount: false,
});

quoteSchema.methods.hide = function() {
  return R.omit(['__v', '_id'], this.toObject());
};

// We define the data model here
const Quote = mongoose.model('Quote', quoteSchema);

// And then we export it
module.exports = Quote;

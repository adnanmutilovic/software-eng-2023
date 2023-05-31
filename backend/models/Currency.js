const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  symbol: {
    type: String,
    trim: true,
  },
  rate: { 
    type: Number,
    required: true,
  },
});

const Currency = mongoose.model("Currency", currencySchema);
module.exports = Currency;

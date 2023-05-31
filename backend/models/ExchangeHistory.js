const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const exchangeHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    baseCurrency: {
      type: String,
      required: true,
    },
    targetCurrency: {
      type: String,
      required: true,
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    conversionRate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExchangeHistory = mongoose.model('ExchangeHistory', exchangeHistorySchema);

module.exports = ExchangeHistory;

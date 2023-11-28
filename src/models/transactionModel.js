const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    cashback: { type: mongoose.Schema.Types.Mixed, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

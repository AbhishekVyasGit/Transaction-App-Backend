const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNum: { type: String, unique: true, required: true },
    availableAmount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

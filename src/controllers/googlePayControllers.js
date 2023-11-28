const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const isValidPhoneNumber = require("../middlewares/validation");

// 1.Login:
const login = async (req, res) => {
  try {
    const { phoneNum, availableAmount } = req.body;

    if (!isValidPhoneNumber(phoneNum)) {
      return res
        .status(400)
        .json({ error: "Invalid phone number. Must be 10 digits." });
    }

    let user = await User.findOne({ phoneNum });

    if (!user) {
      user = new User(req.body);
      await user.save();
    }

    res.json({
      message: "Login successful",
      availableAmount: user.availableAmount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. Transfer Amount:
const transfer = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!isValidPhoneNumber(from) || !isValidPhoneNumber(to)) {
      return res
        .status(400)
        .json({ error: "Invalid phone number. Must be 10 digits." });
    }

    if (from == to) {
      return res
        .status(400)
        .json({ error: "Amount cannot be sent to the same phone number" });
    }

    const sender = await User.findOne({ phoneNum: from });
    const recipient = await User.findOne({ phoneNum: to });

    if (!sender || !recipient) {
      return res.status(400).json({ error: "Invalid sender or recipient" });
    }

    if (sender.availableAmount < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    sender.availableAmount -= amount;
    recipient.availableAmount += amount;

    const transaction = new Transaction({ from, to, amount });

    // 3. Cashback Handling:
    if (amount % 500 !== 0) {
      if (amount < 1000) {
        transaction.cashback = 0.05 * amount;
      } else {
        transaction.cashback = 0.02 * amount;
      }
    } else {
      transaction.cashback = "Better luck next time!";
    }

    // Add cashback amount to sender's availableAmount
    if (typeof transaction.cashback === "number") {
      sender.availableAmount += transaction.cashback;
    }

    await Promise.all([sender.save(), recipient.save(), transaction.save()]);

    // 4. Display Information: Show cashback details
    res.json({
      message: "Transaction successful",
      cashback: transaction.cashback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 5. Display the transaction list of the user Evaluation Criteria:
const getTransactions = async (req, res) => {
  try {
    const phoneNum = req.params.phoneNum;

    if (!isValidPhoneNumber(phoneNum)) {
      return res
        .status(400)
        .json({ error: "Invalid phone number. Must be 10 digits." });
    }

    const transactions = await Transaction.find({ from: phoneNum });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, transfer, getTransactions };

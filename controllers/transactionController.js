const Transaction = require("../models/Transaction");

// @desc Gets all transactions
// @route GET /api/v1/transactions
// @access Public

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc Add a transactions
// @route POST /api/v1/transactions
// @access Public

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const newTransaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    console.log(error);
  }
};

// @desc Delete a transaction
// @route DELETE /api/v1/transactions/:id
// @access Public

exports.deleteTransaction = async (req, res, next) => {
  res.send("Delete transactions");
};

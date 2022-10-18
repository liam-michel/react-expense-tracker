const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const transactionsRouter = require("./routes/transactions");

const connectDB = require("./localdb.js");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

connectDB();

PORT = process.env.PORT || 2300;

const app = express();

app.use(express.json());

app.use("/api/v1/transactions", transactionsRouter);

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});

app.listen(PORT, () =>
  console.log(
    `Backend server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      .yellow.bold
  )
);

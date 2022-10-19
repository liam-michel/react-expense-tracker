const path = require("path");
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

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactionsRouter);

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () =>
  console.log(
    `Backend server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      .yellow.bold
  )
);

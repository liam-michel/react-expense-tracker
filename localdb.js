const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/expensetracker",
      {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `MongoDB connected: ${conn.connection.port}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red);

    process.exit(1);
  }
};

module.exports = connectDB;

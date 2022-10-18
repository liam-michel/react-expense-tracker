const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/expensetracker", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});

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
    console.log(`MongoDB connected: `.cyan.underline.bold);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;

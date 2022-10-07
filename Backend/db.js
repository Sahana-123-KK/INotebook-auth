const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://sahana:hello@cluster0.iaty80a.mongodb.net/mynotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to Mongo...");
  });
};

module.exports = connectToMongo;

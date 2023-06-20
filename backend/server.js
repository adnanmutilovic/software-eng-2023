const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();
require('./cronJob');

const currencyRoutes = require("./routes/currencyRoutes");
const userRoutes = require("./routes/userRoutes");
const exchangeHistoryRoutes = require("./routes/exchangeHistoryRoutes"); 

const app = express();

app.use(cors());
app.use(express.json());

// Use the MONGODB_URI from the .env file
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/currency", currencyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exchange-history", exchangeHistoryRoutes); // Use the routes

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

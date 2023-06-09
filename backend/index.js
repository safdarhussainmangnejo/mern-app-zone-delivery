const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({path: "./vars/.env"});
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cors for dealing with dat from frontend
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

//connecting to database
mongoose.connect(process.env.MONGODB_CONNECTION, {        
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the databasee!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
//middlewares
app.use('/api', userRoutes);

// simple route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Our Profile..." });
});



// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

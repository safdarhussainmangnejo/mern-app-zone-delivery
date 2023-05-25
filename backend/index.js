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

// mongodb+srv://safdarhussainmangnejo:dsldb@cluster0.1kzpq4g.mongodb.net/zonedb?retryWrites=true&w=majority
// mongodb+srv://safdarhussainmangnejo:dsldb@cluster0.1kzpq4g.mongodb.net/zonedb?retryWrites=true&w=majority"
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




// // signup user
// app.post('/signup', async (req, res) => {

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     res.status(401).json({ error: "kindly fill all fields!" })
//   }
//   else {
//     await signupSchema.findOne({ email: email }).then(userExist => {
//       if (userExist) {
//         res.status(401).json({ message: "user already registered" })
//       }
//       else {
//         const user = new signupSchema({ name, email, password });

//         user.save().then(() => {

//           res.status(200).json({ message: "user registered successfully" })
//         }).catch(() => {

//           res.status(401).json({ error: "Failed to register!" })
//         })

//       }
//     })

//   }
// })


// let email1 = null;

// // get user data
// app.get('/getData', async (req, res) => {

//   const userData = await signupSchema.findOne({ email: email1 });
//   // const userData = await signupSchema.find();
//   if (email1 != null) {
//     res.json(userData);
//     // console.log("userData FROM GETDATA: " + userData);
//   }
//   // res.send(userData);
//   else {
//     res.send("userData can't found")
//   }

// })

// // signin user
// app.post('/login', async (req, res) => {

//   try {
//     const { email, password } = req.body;
//     console.log("User login details: ",email,password)
//     if (!email || !password) {
//       return res.status(405).json({ error: "Email or Password missing..." });
//     }

//     const userLogin = await signupSchema.findOne({ email: email });
//     console.log("User found in databse, ",userLogin);
//     if (userLogin) {

//       email1 = email;

//       const isMatch = await bcrypt.compare(password, userLogin.password);

//       if (!isMatch) {
//         res.status(400).json({ error: "invalid credentials!" })
//       } else {

//         const token = await userLogin.generateAuthToken();
//         console.log("Token : "+token)

//         res.send({
//           status: 200,
//           token: token

//         })
//       }

//     }
//     else {
//       res.status(404).json({ error: "invalid credentials!" })
//     }

//   } catch (err) {
//     console.log(err);
//   }
// })

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

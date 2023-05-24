const bcrypt = require('bcryptjs');
const signupSchema = require("../models/SignupSchema");


// signup user
exports.Signup= async (req, res) => {

    const { name, email, password } = req.body;
    console.log("User register data: ",name, email, password)
    if (!name || !email || !password) {
      res.status(401).json({ error: "kindly fill all fields!" })
    }
    else {
      await signupSchema.findOne({ email: email }).then(userExist => {
        if (userExist) {
          res.status(401).json({ message: "user already registered" })
        }
        else {
          const user = new signupSchema({ name, email, password });
  
          user.save().then(() => {
  
            res.status(200).json({ message: "user registered successfully" })
          }).catch(() => {
  
            res.status(401).json({ error: "Failed to register!" })
          })
  
        }
      })
  
    }
  }
  
  
  let email1 = null;
  
  // get user data
  exports.getData = async (req, res) => {
  
    const userData = await signupSchema.findOne({ email: email1 });
    // const userData = await signupSchema.find();
    if (email1 != null) {
      res.json(userData);
      // console.log("userData FROM GETDATA: " + userData);
    }
    // res.send(userData);
    else {
      res.send("userData can't found")
    }
  
  }
  
  // signin user
 exports.Login = async (req, res) => {
  
    try {
      const { email, password } = req.body;
      console.log("User login details: ",email,password)
      if (!email || !password) {
        return res.status(405).json({ error: "Email or Password missing..." });
      }
  
      const userLogin = await signupSchema.findOne({ email: email });
      console.log("User found in databse, ",userLogin);
      if (userLogin) {
  
        email1 = email;
  
        const isMatch = await bcrypt.compare(password, userLogin.password);
  
        if (!isMatch) {
          res.status(400).json({ error: "invalid credentials!" })
        } else {
  
          const token = await userLogin.generateAuthToken();
          console.log("Token : "+token)
  
          res.send({
            status: 200,
            token: token
  
          })
        }
  
      }
      else {
        res.status(404).json({ error: "invalid credentials!" })
      }
  
    } catch (err) {
      console.log(err);
    }
  }
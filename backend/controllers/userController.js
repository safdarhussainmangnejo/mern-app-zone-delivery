const bcrypt = require('bcryptjs');
const signupSchema = require("../models/SignupSchema");
const nodemailer = require('nodemailer')
const crypto = require('crypto');
require("dotenv").config();
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.SENDGRID_API
    }
}))


// signup user
exports.Signup= async (req, res) => {

    const { name, email, password } = req.body;
    console.log("User register data: ",name, email, password)
    if (!name || !email || !password) {
      res.json({ status: 401, message: "kindly fill all fields!" })
    }
    else {
      await signupSchema.findOne({ email: email }).then(userExist => {
        if (userExist) {
          res.json({status: 401, message: "user already registered" })
        }
        else {
          const user = new signupSchema({ name, email, password });
  
          user.save().then(() => {
  
            res.json({status: 200, message: "user registered successfully" })
          }).catch(() => {
  
            res.json({status: 401, message: "Failed to register!, try again" })
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
      
      if (userLogin) {
        console.log("User found in databse, lets match password ", userLogin.email);
        email1 = email;
  
        const isMatch = await bcrypt.compare(password, userLogin.password);
        console.log("password matched , ", isMatch);
        if (!isMatch) {
          res.send({ status:400, error: "invalid credentials!" })
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
    
 exports.ResetPassword = async (req,res)=>{
    console.log("Received email for reset password: ", req.body.email);
    await crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")

        signupSchema.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                console.log("Error occurred");
                return res.status(422).json({error:"User do not exists with that email"})
            }
            console.log("User found")
            console.log("Token : "+token)
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                console.log("response after reset request ",result)
                transporter.sendMail({
                    to:user.email,
                    from:"	safdarhussain.bcsf18@iba-suk.edu.pk",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                console.log("Email sent");
                res.json({message:"check your email"})
            })

        })
    })
    }


  exports.NewPassword = (req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    console.log("Received Password and Token: ",newPassword, token)
    signupSchema.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            console.log("resetTime and token not found or expired");
            return res.send({status:422, error:"Try again session expired"})
        }
        console.log("User after reset time matched : ", user);
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
                console.log("Response after passwrod update: ", saveduser)
               res.send({message:"Password updated successfully"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
}
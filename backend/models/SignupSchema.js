const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken:{type:String},
    expireToken:{type:Date},
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

signupSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();

})

signupSchema.methods.generateAuthToken = async function () {
    console.log("User ID: ,",this._id.toString(), "a Secred Key ", process.env.SECRET_KEY )
    try {

        let token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        console.log("User Tokden Generated: ",token);
        this.tokens = this.tokens.concat({ token:token})
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}

// const insertData = async ()=>{
//   const data = await mongoose.model('users', signupSchema).create({
//       name:"Safdar Hussain",
//       email:"safdarhussain@gmail.com",
//       password:"Naudero"
//   });
//   console.log("User created : "+data)
// }

// insertData();
module.exports = mongoose.model('users', signupSchema);

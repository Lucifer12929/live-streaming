const mongoose = require('mongoose')
// import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
   
    avatar: {
        type: String,
        default: "https://i.imgur.com/tJOSejv.png"
    }},
    {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)
const mongoose = require("mongoose")

const {Schema} = require("mongoose")

const userSchema = Schema({
    firstName : {
        type : String
    },
    secondName : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
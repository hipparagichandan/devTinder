const mongoose = require("mongoose")
const validator = require("validator")

const {Schema} = require("mongoose")

const userSchema = Schema({
    firstName : {
        type : String,
        required : true,
        required : true,
        maxlength : 50,
        trim :true
    },
    secondName : {
        type : String,
        maxlength : 50
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        trim :true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("EmailId is not valid")
            }
        }
    },
    password : {
        type : String,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Failed : Enter a Strong password")
            }
        }
        
    },
    age : {
        type : Number,
        min :18
    },
    gender : {
        type : String,
        validate(value ){
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error("Gender data entered is not Valid")
            }
        }

    },
    skills : {
        type : [String]
    },
    about : {
        type : String,
        default : "This is About me"
    },
    imageUrl : {
        type : String,
        default : "https://i.pinimg.com/474x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("imageUrl is not valid")
            }
        }
    }
},{
    timestamps : true
})

const User = mongoose.model("User", userSchema)

module.exports = User;
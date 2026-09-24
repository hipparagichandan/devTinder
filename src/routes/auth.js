const express = require("express");
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require('../models/user')

const authRouter = express.Router()

authRouter.post("/signup" , async (req,res) => {
    const {firstName, lastName,emailId, password,} = req.body
    try{
        //validate all fields
        validateSignUpData(req)

        //encrypt the passowrd
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        })
        
        await newUser.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(400).send("User was not added. Error : " + err.message)
    }
})


authRouter.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("Invalid Credentials!")
        }
        const isPasswordCorrect = await user.verifyPassword(password)
        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials!")
        }
        const token = user.getJWT()

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            // expires : new Date(Date.now() + 3600000)
        })
        res.send(user)
            
        

    }catch(err){
        res.status(400).send( "ERROR : " + err.message)
    }
})


module.exports = authRouter;
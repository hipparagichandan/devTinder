const express = require('express')
const connectDB = require("./config/database")
const User = require('./models/user')
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")


const app = express()
//express.json() converts json to Javascript object. VERY IMPORTANT
//program can't read cookies, you need cookie-parser to read cookies. Using it as a middleware so all the routes can get the parser
app.use(express.json())
app.use(cookieParser())

app.post("/signup" , async (req,res) => {
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

app.post("/login", async (req,res) => {
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

app.get("/profile", userAuth, async (req,res) => {
    try{
        const {user} = req
        res.send(user)
    }catch(err){
        res.status(400).send( "ERROR : " + err.message)
    }
})

app.post("/sendConnectionRequest", userAuth, (req,res) => {
    const {user} = req;
    res.send("Connection Request Sent by " + user.firstName)
})

connectDB().then( () => {
    console.log("Database Connection succesful")
    app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
}).catch(err => {
    console.log("Database Connection is NOT Sucesful")
})
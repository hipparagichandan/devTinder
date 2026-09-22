const express = require('express')
const connectDB = require("./config/database")
const User = require('./models/user')

const app = express()
//express.json() converts json to Javascript object. VERY IMPORTANT
app.use(express.json())

app.post("/signup" , async (req,res) => {
    const newUser = new User(req.body)

    try{
        await newUser.save();
        res.send("User Added Successfully")
    } catch (err) {
        res.status(500).send("User was not added. Error : " + err.message)
    }
})

connectDB().then( () => {
    console.log("Database Connection succesful")
    app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
}).catch(err => {
    console.log("Database Connection is NOT Sucesful")
})
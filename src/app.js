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

//get user by id
app.get("/userById" , async (req,res) => {
    const userId = req.body._id
    try{
        console.log("Fetching data for ID : " + userId)
        const user = await User.findById(userId)
        if(!user){
            res.status(404).send("User not found") 
        }else{
            res.send(user)
        }

    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//get user with emailId
app.get("/user" , async (req,res) => {
    const userEmailId = req.body.emailId
    try{
        console.log("Fetching data for emailId : " + userEmailId)
        const user = await User.findOne({emailId : userEmailId })
        if(!user){
            res.status(404).send("User not found") 
        }else{
            res.send(user)
        }

    }catch(err){
        res.status(400).send("Something went wrong")
    }
 })

 // Get all users data for the feed
 app.get("/feed" , async (req,res) => {
    try{
        const users = await User.find({})
        if(users.length === 0){
            res.status(404).send("No users to display")
        } else {
            res.send(users)
        }
    }
    catch(err) {
        res.status(400).send("Something went wrong")

    }
 })

 app.delete("/userByEmailId", async (req,res) => {
    try{
        const result = await User.deleteOne({emailId : req.body.emailId})
        if(result.deletedCount === 1){
            res.send("Deleted Succssfully")
        } else {
            res.status(404).send("User Not found")
        }
    }catch(err) {
        res.status(400).send("Something went wrong")
    }
 })

 app.delete("/user" , async (req,res) => {
    try{
        const userID = req.body._id
        const user = await User.findByIdAndDelete(userID)
        if(!user){
             res.status(404).send("User Not found")
        }else {
            res.send("Deleted Successfully " + JSON.stringify(user))
        }
    }catch(err) {
        res.status(400).send("Something went wrong")
    }
 } )

 app.patch("/user", async (req, res) => {
    try{
        const userID = req.body._id
        const user = await User.findByIdAndUpdate(userID, req.body, {runValidators : true})
        if(!user){
             res.status(404).send("User Not found")
        }else {
            res.send("Updated Successfully " + JSON.stringify(user))
        }
    }catch(err) {
        res.status(400).send("Something went wrong")
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
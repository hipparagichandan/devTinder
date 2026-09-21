const express = require('express')

const app = express()

const {authAdmin, userAuth} = require("./middlewares/auth")

app.use("/admin", authAdmin )

app.get("/admin/getAllData" , (req, res, next) => {
    console.log("Admin is being authenticated")
    res.send("All Data Sent")
})

app.delete("/admin/deleteUser" , (req,res) => {
    res.send("User Deleted")
})

app.post("/user/login", (req,res) => {
    res.send("User Logged in Succesfully")
})
app.get("/user/data", userAuth, (req,res) => {
    console.log('Fetching user data')
    res.send("UserData sent successfully")
})
// app.get('{*splat}', (req, res)=>{
//     res.send("Please check your routes")
// })

app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
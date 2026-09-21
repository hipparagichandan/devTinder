const express = require('express')

const app = express()

app.get("/getUserData" , (req,res) => {
    throw new Error("dfdfd")
    res.send("User Data Sent")
})

// //it is best to write and handle errors inside the try catch block
// app.get("/userData" , (req,res,next) => {
//     try{
//         //logic
//         throw new Error("random error ")

//     } catch (err){
//         //log your error
//         res.status(500).send("Error Caught here, something went wrong")
//     }
// })

//This will match all routes and if any error is not handled it will be caught and handled here
app.use("/", (err,req,res,next) => {
    if(err){
        res.status(500).send("Somethig went wrong")
    }
})

app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
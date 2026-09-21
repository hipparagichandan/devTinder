const express = require('express')

const app = express()

app.use("/test", (req, res)=>{
    res.send("Hello Hello Hello Testing 123..")
})

app.use("/about", (req, res)=>{
    res.send("This is all ABOUT Heloo")
})

app.use("/",(req, res)=>{
    res.send("Hello from server ")
})

app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
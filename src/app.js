const express = require('express')

const app = express()

app.use(
    "/user", 
    [(req, res, next) => {
        console.log("Handling Route user 1")
        next();
        // res.send(" 1st Resonse")
    },
    (req, res, next) => {
        console.log("handling route user 2")
        // res.send(" 2nd Response")
        next()
    }],
    (req, res) => {
        console.log("handling Response 3")
        res.send(" 3rd Response")
    }
)

app.get('{*splat}', (req, res)=>{
    res.send("Please check your routes")
})

app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
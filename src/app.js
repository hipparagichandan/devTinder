const express = require('express')

const app = express()

//Order of the routes matter, the first matching wildcard for that route will be resolved
app.get("/user/:userId" , (req,res) =>{
    console.log("Req params ",req.params)
    console.log("Req queries ",req.query)
    res.send("You have requested GET for userID : " + req.params.userId + " and optional queries : " + JSON.stringify(req.query) )
})

app.get("/user" , (req, res)=> {
    res.send({"firstname" : "Chandan", "secondname" : "Hipparagi"})
})

app.post("/user", (req,res) => {
    // handle post logic
    res.send("User Post succesful")
})

app.put("/user", (_,res)=> {
    res.send("Updated User sucesfully")
})

app.patch("/user", (req, res)=> {
    res.send("Patch request successful")
})

app.delete("/user", (req,res)=>{
    res.send("Deleted Successfully")
})

//this will match all the routes that starts with /test eg: /test/123 will be resolved here
app.use("/test",(req, res)=>{
    res.send("Hello from test server ")
})

app.get('{*splat}', (req, res)=>{
    res.send("Please check your routes")
})

app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
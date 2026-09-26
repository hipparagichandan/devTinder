const express = require('express')
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")


const app = express()

//express.json() converts json to Javascript object. VERY IMPORTANT
//program can't read cookies, you need cookie-parser to read cookies. Using it as a middleware so all the routes can get the parser
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);
app.use(userRouter);


connectDB().then( () => {
    console.log("Database Connection succesful")
    app.listen(7777, ()=>{
    console.log("Server is listening on port 7777... ")
})
}).catch(err => {
    console.log("Database Connection is NOT Successful")
})
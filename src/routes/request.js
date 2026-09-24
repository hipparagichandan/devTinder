const express = require("express")
const requestRouter = express.Router()

const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, (req,res) => {
    const {user} = req;
    res.send("Connection Request Sent by " + user.firstName)
})


module.exports = requestRouter;
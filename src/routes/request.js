const express = require("express")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const {userAuth} = require("../middlewares/auth")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const {toUserId, status} = req.params;
        console.log("status sent  : " + status)

        const allowedStatus = ["interested", "ignored"]
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status : " + status)
        }

        const toUser = await User.findById(toUserId)
        if(!toUser){
            throw new Error("The user you are trying to conect doesn't exist")
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        console.log(existingRequest)

        if(existingRequest){
            throw new Error("The connection already exists")
        }

        const request = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await request.save()
        res.json({
            message : `${status} request from ${req.user.firstName} to ${toUser.firstName} succesful`,
            request : data
        })
 
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})


module.exports = requestRouter;
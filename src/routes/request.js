const express = require("express")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const {userAuth} = require("../middlewares/auth")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const {toUserId, status} = req.params;

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

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        const allwoedStatuses = ["accepted", "rejected"]
        if(!allwoedStatuses.includes(status)){
            throw new Error("Invalid Status request")
        }

        const request = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        if(!request){
            throw new Error("The user is not found")
        }

        request.status = status
        const data = await request.save()

        res.json({
            message : `${loggedInUser.firstName} ${status} the request`,
            request
        })

    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})


module.exports = requestRouter;
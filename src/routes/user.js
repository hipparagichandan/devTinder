const express = require("express")
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName age skills imageUrl"

userRouter.get("/user/requests/received", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const data = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId" , "firstName lastName age skills imageUrl")
        // }).populate("fromUserId" , ["firstName", "lastName","age", "skills", "imageUrl"]) //--This can be written without array in a space separated string

        res.json({
            message : "Fetched pending Requests Succesfully",
            data
        })

    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId" , USER_SAFE_DATA ).populate("toUserId" , USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId

            }
                return row.fromUserId
        } )

        res.json(data)

    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})


// 1. Check out another interesting & better approach using ConnectionRequest.distict and sending a Peomise.all request to resolve fromUserIds and toUserIDs
userRouter.get("/user/feed" , userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = Math.min(50,limit)
        limit = Math.max(1,limit)

        page = Math.max(1,page)

        const skip = (page-1) * limit


        //find all connectionRequests that invoves loggenInUser
        const connectionRequests = await ConnectionRequest.find({
            $or :[
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        })

        const excludeUserIds = new Set();

        connectionRequests.forEach( (request) => {
            excludeUserIds.add(request.fromUserId.toString())
            excludeUserIds.add(request.toUserId.toString() )
        })


        const feed = await User.find( { 
            $and : [
                { _id : { $nin : Array.from(excludeUserIds) }},
                { _id : { $ne : loggedInUser._id} }  //this can be added directly excludedUserIds.add(loggedInUser._id) , but this is a way to learn $and operator
            ]}).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json(feed)
        
        }catch(err){
            res.status(400).send("ERROR : " + err.message)
    }
})

module.exports = userRouter;
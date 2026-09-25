const express = require("express")
const {userAuth} = require("../middlewares/auth")
const {validateUpdateData, validatePasswordUpdate} = require("../utils/validation")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try{
        const {user} = req
        res.send(user)
    }catch(err){
        res.status(400).send( "ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        const isDataValid = validateUpdateData(req)
        if(!isDataValid){
            throw new Error("Requested data can not be updated")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field])
        await loggedInUser.save()

        res.json({"message" : "update successful", "data" : loggedInUser})
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/password", userAuth,  async(req,res)=>{
    try{
        validatePasswordUpdate(req)
        if(!req.body.password){
            throw new Error("Invalid Data Sent")
        }
        const loggedInUser = req.user;
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        
        loggedInUser["password"] = passwordHash;
        await loggedInUser.save()
        res.send("Password updated")
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

module.exports = profileRouter;
const validator = require('validator')

function validateSignUpData(req){

    const {firstName , lastName, emailId, skills, age, password} = req.body
    
    if(!firstName || !lastName){
        throw new Error("Name is required")
    } else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("Name length should be between 4 to 50 characters")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Enter Valid emailId")
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
    
}

function validateUpdateData (req){
    const allowedUpdateFields = ["firstName", "lastName", "skills", "about", "imageUrl", "age"]
    const isUpdateAllowed = Object.keys(req.body).every( field => allowedUpdateFields.includes(field))
    return isUpdateAllowed;
 }

 function validatePasswordUpdate(req){
    console.log(req.body)
    const bodyData = Object.keys(req.body)
    
    if(bodyData.length !== 1) {
        throw new Error("Invalid Data Sent")
    };
    if (Object.keys(req.body)[0] !== "password"){
        throw new Error("Invalid Data Sent")
    }
    if(!validator.isStrongPassword(req.body.password)){
        throw new Error("Enter a strong password")
    }
    
    
 }


module.exports = {validateSignUpData, validateUpdateData, validatePasswordUpdate}
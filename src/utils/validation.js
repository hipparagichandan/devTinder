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


module.exports = {validateSignUpData}
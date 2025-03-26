const validator = require("validator")
const validations = (req)=>{
    const {firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        throw new Error ("name is not valid")
    }
     else if(!validator.isEmail(email)){
        throw new Error ("email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("password is not valid") 
    }

}
module.exports = {
    validations,
}
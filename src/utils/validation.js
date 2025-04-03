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
const onupdatecheck = (req)=>{
    // checking the data req is you alowed 
    const allowed = ["firstName","lastName","age","gender","about","photo","skills"];
    const iseditallowed = Object.keys(req.body).every(feild => allowed.includes(feild));
    
    // if not 
    if(!iseditallowed){
        throw new Error ("details are not valid")
    }
    if("photo" in req.body && req.body.photo === "string" && !validator.isURL(req.body.photo)){
        throw new Error ("photo URl are not valid")
    }
    else {
        return true;
    }
} 
module.exports = {
    validations,
    onupdatecheck,
}
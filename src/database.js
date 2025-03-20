/* const username = "lambertliya84";
const password = "yHGqmR5SO7270aob"; */
const mongoose = require("mongoose");
const url = "mongodb+srv://lambertliya84:yHGqmR5SO7270aob@cluster0.ql3o6.mongodb.net/"; 
const connectDB = async()=>{
    await mongoose.connect(url)
    
}


  
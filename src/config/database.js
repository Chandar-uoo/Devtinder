/* const username = "lambertliya84";
const password = "yHGqmR5SO7270aob"; */
const mongoose = require("mongoose");
const url = "mongodb+srv://lambertliya84:FIZrWC9kFitnTjzK@cluster0.ql3o6.mongodb.net/devtinder"; 
const connectDB = async()=>{
    await mongoose.connect(url)
};
module.exports = {
    connectDB,
};


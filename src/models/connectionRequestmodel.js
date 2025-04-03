const mongoose = require("mongoose");

const connectionrequestSchema = new mongoose.Schema({

    fromUserId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :true
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type :String,
        enum:["Interested","accepted","Rejected","Igonore"],
        default:"Igonore"
    }
},
{
    timestamps:true
});
module.exports = mongoose.model("connectionrequestSchema", connectionrequestSchema);


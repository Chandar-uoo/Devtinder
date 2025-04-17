const express = require("express");
const { connectDB } = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors")

// crate a server by creating a express instance
const app = express();

// universal modifier 
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.options('*', cors());
app.use(express.json());``
app.use(cookieparser());

const {authRouter} = require("./routes/auth");
const{ profileRouter }= require("./routes/profile");
const {requestRouter} = require("./routes/request");
const {userRouter} = require("./routes/user")
 // it will come / then move to routehandler and check any match and return
app.use("/",authRouter);
app.use("/",profileRouter); 
app.use("/",requestRouter);
app.use("/",userRouter);



// db logic to connect
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error("failed");
  });
app.listen(5000, () => {
  console.log("sucess");
});


 
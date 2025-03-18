const express = require('express'); 

// crate a server by creating a express instance
const app = express();

app.listen(5000,()=>{
    console.log("sucesss"); 
    
});
app.use("/test",(req,res)=>{
    res.send("hello hi backend boy")
})
// alway close previous server port before it or we change the pot


const express = require("express");

// crate a server by creating a express instance
const app = express();

// use err as first parameter

/* 
const { adminauth,userauth } = require("./middleware/auth");
app.use("/admin",adminauth );
app.get("/admin/user", (req, res) => {
  res.send("all okay user");
});
app.get("/user",userauth, (req, res) => {
  res.send("all okay user");
});

 app.listen(5000, () => {
  console.log("sucesss");
}); */
/*app.use("/txt", (req, res) => {
  res.send("hello hi backend 1 bu boy");
});

app.use("/test", (req, res) => {
  res.send("hello hi backend 3 son boy");
});
app.use("/", (req, res) => {
  res.send("hello hi backend 2  boy");
}); */
// alway close previous server port before it or we change the

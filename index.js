const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
port=process.env.port;
const {db_connection}=require("./config/database");
const user=require("./routes/user.js");
app.listen(port,()=>
{
    console.log("hi darshan soni",port);
});
db_connection();
app.use("/user",user);




app.get("/",(req,res)=>

{
    res.send("welcome to authN and authZ project");
});
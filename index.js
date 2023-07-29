const express=require("express");
const app=express();
app.use(express.json());
app.listen(3000,()=>
{
    console.log("hi darshan soni");
});

app.get("/",(req,res)=>

{
    res.send("welcome to authN and authZ project");
})
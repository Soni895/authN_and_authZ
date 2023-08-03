const express = require('express');
const router = express.Router();
const{login}=require("../controllers/login");
const {signup}=require("../controllers/signup");
const {Auth,isStudent,isAdmin}=require("../middlewares/auth")
router.post("/login",login);
router.post("/signup",signup);

router.get("/student",Auth,isStudent,(req,res,next)=>
{
    res.json(
        {
            status:"successful",
            isStudnent:true,
            mesage:"welcome to protected route of student",

        }
    )

})



router.get("/admin",Auth,isAdmin,(req,res,next)=>

{
  res.json(
        {
            status:"successful",
            isStudnent:true,
            mesage:"welcome to protected route of Admin",

        }
    )

})
module.exports=router;

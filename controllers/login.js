const user=require("../models/usermodel");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt= require("jsonwebtoken");
const jwt_secret=process.env.jwt_secret;

exports.login=async(req,res)=>
{
    try {
        const {Email,Password}=req.body;

        if(!Email||!Password)
        {
            return res.status(500).json(
            {
                    status:"unsuccessful",
                    success:false,
                    error:"Empty field please fill all required field",
                }); 
            }
            const response= await user.findOne({Email});
            if(!response)
            {
                return res.status(500).json(
                        {
                            status:"unsuccessful",
                            success:false,
                            error:"user  not found",
                        });
              }
            const ismatch= await bcrypt.compare(Password,response.Password);
            if(!ismatch)
            {
               return  res.status(500).json(
                    {
                        status:"unsuccessful",
                        success:false,
                        error:"password not match",
                    }); 
            }
            const payload=
            {
                Email:response.Email,
                id:response._id,
                Role:response.Role

            }

            let token=jwt.sign(payload,jwt_secret,
                {
                    expiresIn:"2h",
                });
                // response=response.toObject();
                response.Token=token;
                console.log(response.Token);
                response.Password=undefined;

                const options={
                    expires:new Date( Date.now()+3*24*60*60*1000),
                   httpOnly:true,

                }
                res.cookie("login",token,options).status(200).json(
                    {
                        status:"successful",
                        token,
                        response,
                        message:"successful login",
                        Email,
                        Password,

                    })
        
    } catch (error) {
        res.status(500).json(
            {
                status:"unsuccessful",
                success:false,
                error:error,
            }
        )
        
    }



}


const bcrypt=require("bcrypt");
const user=require("../models/usermodel");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const jwt_secret=process.env.jwt_secret;

exports.login=async(req,res)=>
{
    try {
        
const {Email,Password}=req.body;
if(Email&&Password)
{
    const response= await user.find({Email});
    if(response)
    {
        const ismatch= await bcrypt.compare(Password,response.Password);
        if(ismatch)
        {
            let payload={
                Email:response.Email,
                Role:response.Role,
                id:response._id

            }

            const Token=jwt.sign(payload,jwt_secret,
                {
                    expiresIn:"2h"
                });
                response=response.toObject();
                response.Token=Token;
                response.Password=undefined;
                const option={
                    expires:new Date(Date.now()+3*24*60*60*1000),
                    httpOnly:true,
                    
                }

                res.cookie("Token",Token,option).status(200).json(
                    {
                        status:"successful",
                        response:response,
                        Token:Token,
                        ismatch:ismatch,
                        Email,
                        Password,
                        option,
                    }
                )

        }
        else{
            res.status(400).json({
                status:"unsuccessful",
                error:"Password not match",
            });

        }
    }

    else{
        res.status(400).json({
            status:"unsuccessful",
            error:"user not found",
        });

    }

}
else
{
    res.status(400).json({
        status:"unsuccessful",
        error:"empty field",
    });
}

    } catch (error) {
        res.status(400).json({
            status:"unsuccessful",
            error:error,
        });

        
    }

  
  
}
// auth isstudent isadmin

const  jwt=require("jsonwebtoken");
require("dotenv").config();
const  jwt_secret=process.env.jwt_secret;
exports.Auth=(req,res,next)=>
{
    try {
        // extract jwt token with different way headerSize,body,cookies
        //cookee parseer
        const {token}=req.body;
        if(!token)
        {
            return res.status(500).json(
                {
                    status:"unsuccessful",
                    success:false,
                    error:" token not found",
                });
        }
        // verify the token
        try {
            const decode=jwt.verify(token,jwt_secret);
            console.log(decode);
            req.user=decode;
            console.log(decode);

            
        } catch (error) {
            return res.status(500).json(
                {
                    status:"unsuccessful",
                    success:false,
                    error:" token is invalid",
                });
        }
          next();
        
    } catch (error) {
        return res.status(500).json(
            {
                status:"unsuccessful",
                success:false,
                error:error,
            });
        
    }

}

exports.isStudent=(req,res,next)=>
{
    try {
        if(req.user.Role!=="Student")
        {
            
         
                return res.status(500).json(
                    {
                        status:"unsuccessful",
                        success:false,
                        error:" user not authorize for this role",
                    });
                    next();
        }
        
    } catch (error) {
        return res.status(500).json(
            {
                status:"unsuccessful",
                success:false,
                error:error,
            });
        
    }

}

exports.isAdmin=(req,res,next)=>
{
    try {
        if(req.user.Role!=="Admin")
        {
            return res.status(500).json(
                {
                    status:"unsuccessful",
                    success:false,
                    error:"user not authorize for this role",
                });
        }

        
    } catch (error) {
        return res.status(500).json(
            {
                status:"unsuccessful",
                success:false,
                error:" token not found",
            });
        
    }
}
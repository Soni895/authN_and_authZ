
const bcrypt=require("bcrypt");
const user=require("../models/usermodel");
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
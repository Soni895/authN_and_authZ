
const bcrypt=require("bcrypt");
const user=require("../models/usermodel");
exports.signup=async(req,res)=>
{
    try {
        const {Name,Email,Password,Role}=req.body;
        // check if uer already exists
        const exist_user=await user.findOne({Email});
        if(exist_user)
        {
            return res.status(400).json(
                {
                    status:"already exists user",
                    success:false,

                } )
        }
        if(!Email||!Password)
        {
            return res.status(500).json(
            {
                    status:"unsuccessful",
                    success:false,
                    error:"Empty field please fill all required field",
                }); 
            }
        let hashedpassword;
        try{
            hashedpassword= await bcrypt.hash(Password,10);

        }
        catch(error)
        {
            return res.status(400).json(
                {
                    status:"error in hasing password",
                    success:false,

                }
            )
        }
        const User = await user.create(
            {
                Name,Email,Password:hashedpassword,Role
            }
        )
        return res.status(200).json(
            {
                status:true,
                message:"user Signup successful",
                User,
            }
        )


    } catch (error) {
        return res.status(500).json(
            {
                status:"unsuccessful",
                success:false,
                error:error,
            }
        )
        
    }
    
}
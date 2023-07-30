const mongoose=require("mongoose");
const userSchema= new mongoose.Schema(
    {
        Name:{
            type:String,
            require:true,
            trim:true,
        },

        Email:{
            type:String,
            require:true,
            trim:true,
        },
        Password:{
            type:String,
            require:true,
            trim:true,
        },
        Role:
        {
            type:String,
            enum:["Admin","Student","Visitor"],
         
        }
    
    }
);
const user=mongoose.model("user",userSchema);
module.exports=user;
mongoose=require("mongoose");
require("dotenv").config();
url=process.env.db_url;

exports.db_connection=()=>
{
    mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    ).then(()=>
    {
        console.log("connection Successfull");
    })
    .catch((error)=>
    {
        console.log("connection Unsuccessfull");
        console.log(error);
        process.exit(1);
    })
}
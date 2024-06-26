const mysql=require("mysql2");
const dotenv=require("dotenv");
dotenv.config();
const con=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});
con.connect((err)=>{
    if(!err){
        console.log("Database Connected Successfully");
    }
    else{
        throw err;
    }
});
module.exports=con;
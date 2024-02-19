const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
try {
    const {username,email,password}=req.body;
    let user= await Users.findOne({email})
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
 
if(!symbolRegex.test(password)){
    return res.json({msg:"Password must contain a special character"})
}
    if(password.length<6){

        return res.json({msg:"Password too short"})
    }
    if(username.length<3){

        return res.json({msg:"Username too short"})
    }
    
if(user){

        return res.json({msg:"User already exists"})}

        console.log(req.body)

await Users.create({...req.body,  password: await bcrypt.hash(password, 5)});

return res.json({msg:"User created successfully"})

} catch (error) {
    console.error(error)
}});


router.post("/login", async (req, res) => {
try {
    
    const {email,username}=req.body;
    

    const user=await Users.findOne({email})
    if(!user){
        return res.json({msg:"User does not exist"})}

    const isMatch=await bcrypt.compare(password, user.password)

    if(!isMatch){
    return res.json({msg:"Invalid credentials"})}

    const token = jwt.sign({

email, 
createdAt: new Date(),
admin: user.admin,
},"OUR_SECRET",
{expiresIn:"2d"} );

res.json({msg:"Logged In",token})
    }
catch (error) {
console.error(error)}
}
);


module.exports=router;
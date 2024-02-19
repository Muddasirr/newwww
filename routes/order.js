const Users = require("../models/User");
const express = require("express");
const router = express.Router();    
const jwt = require("jsonwebtoken");
const Orders=require("../models/Order");

router.post("/createOrder", async (req, res) => {
try {
    const user=await Users.findOne({email:req.body.email})
    if(!user){
        return res.json({msg:"User does not exist"})}
          await Orders.create({...req.body, user:user._id});  
    return res.json({msg:"Order created successfully"})


} catch (error) {
console.error(error)
    }
})

router.get("/getOrders", async (req, res) => {

    try {
        
        const orders = await Orders.find().populate('user', 'email Location Phone');
        res.json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });


    router.post("/deleteOrder", async (req, res) => {
try {
    const order = await Orders.findOne({OrderId:req.body.OrderId})
    if(!order){
        return res.json({msg:"Order does not exist"})}
        await Orders.deleteOne({OrderId:req.body.OrderId})
        return res.json({msg:"Order deleted successfully"})
} catch (error) {
    console.error(error)
    return res.json({msg:"Server Error"})
    
}

    })

    router.post("/updateOrder",async(req,res)=>{
try {
    const order = await Orders.findOne({OrderId:req.body.OrderId})
    if(!order){
        return res.json({msg:"Order does not exist"})}
        await Orders.updateOne({OrderId:req.body.OrderId},req.body)
        return res.json({msg:"Order updated successfully"})
    
} catch (error) {
    console.error(error)
}

    })

    








module.exports=router;
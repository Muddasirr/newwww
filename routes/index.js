const express= require('express');
const router=express.Router();
const authRouter=require('./auth');
const orderRouter=require('./order');

router.use('/auth',authRouter);
router.use('/order',orderRouter);

module.exports=router;
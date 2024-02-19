const mongoose=require('mongoose');


const OrderSchema= new mongoose.Schema({  
OrderId:String,
Quantity:Number,
Product:String,
Price:Number,
Total:Number,
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}
})

const Order = mongoose.model('Order', OrderSchema);
module.exports=Order;
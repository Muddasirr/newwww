const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    username:String,
    email:String,
    Location:String,
    Phone:String,
    password:String,
    admin:{type:Boolean,default:false},

    createdAt:{type:Date,
        default:Date.now}
    
    

})


const User = mongoose.model('User', UserSchema);

module.exports=User;
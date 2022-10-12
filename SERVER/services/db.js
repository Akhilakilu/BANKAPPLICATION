//import mongoose
const mongoose=require('mongoose')
// connect server to mongodb 
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('mongo db connected');
})

//create a model/collection
const User=mongoose.model('User',{
    accno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export
module.exports={
    User
}
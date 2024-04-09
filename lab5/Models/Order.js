const mongoose=require("mongoose");


const OrderSchema=new mongoose.Schema({
    TotalPrice:{type:Number,required:true},
    Items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item"
    }],
})
const Order=mongoose.model("Order",OrderSchema);
module.exports=Order;
const mongoose=require("mongoose");

const ItemSchema=new mongoose.Schema({
    Name:{type:String,required:true},
    Price:{type:Number,required:true},
    Description:{type:String,required:true},
})

const Item=mongoose.model("Item",ItemSchema);
module.exports=Item;
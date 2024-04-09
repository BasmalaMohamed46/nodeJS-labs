const Item = require('../Models/Item');
const ItemModel=require('../Models/Item');
const ItemValidation=require('../Utils/ItemsValidation');

module.exports.GetAllItems=async(req,res)=>{
    try{
        let allItems=await ItemModel.find();
        if(allItems.length>0){
            return res.status(200).json({message:"Items Founded Successfully",data:allItems})
        }
        else{
            return res.status(200).json({message:"Items Not Found"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.GetItemByID=async(req,res)=>{
    try{
        let itemId=req.params.id;
        let foundedItem=await ItemModel.findById(itemId);
        if(foundedItem){
            return res.status(200).json({message:"Item Founded Successfully",data:foundedItem})
        }
        else{
            return res.status(404).json({message:"Item Not Found"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.AddItem=async(req,res)=>{
    try{
        let item=req.body;
        let isValidItem=ItemValidation(item)
        if(isValidItem){
            let addedItem=await ItemModel.create(item)
            return res.status(201).json({message:"Item Added Successfully",data:addedItem})
        }else{
            return res.status(404).json({message:"Invalid Item Data",details:ItemValidation.errors[0].instancePath.split("/")[1]+":"+ItemValidation.errors[0].message})
        }
    }
    catch(err){
       return res.status(500).json({message:err.message})
    }
}

module.exports.UpdateItemByID=async (req,res)=>{
    try{
        let itemId=req.params.id;
        let newItem=req.body;
        let foundedItem=await ItemModel.findById(itemId);
        if(!foundedItem){
            return res.status(404).json({message:"Item Not Found"})
        }
        let isValidItem=ItemValidation(newItem)
        if(isValidItem){
            let updatedItem=await ItemModel.findByIdAndUpdate(itemId,newItem,{new:true})
            if(updatedItem){
                return res.status(200).json({message:"Item Updated Successfully",data:updatedItem})
            }
        }
        else{
            return res.status(404).json({message:"Invalid Item Data",details:ItemValidation.errors[0].instancePath.split("/")[1]+":"+ItemValidation.errors[0].message})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.DeleteItemByID=async (req,res)=>{
    try{
       let itemId=req.params.id;
       let foundedItem=await ItemModel.findById(itemId);
         if(!foundedItem){
              return res.status(404).json({message:"Item Not Found"})
         }
       let deletedItem=await ItemModel.findByIdAndDelete(itemId);
       if(deletedItem){
        return res.status(200).json({message:"Item Deleted Successfully"})
       }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}
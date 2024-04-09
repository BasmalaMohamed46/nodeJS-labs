const OrderModel=require('../Models/Order');
const OrderValidation=require('../Utils/OrdersValidation');

module.exports.GetAllOrders= async(req,res)=>{
    try{
        let allOrders=await OrderModel.find();
        if(allOrders.length > 0){
            return res.status(200).json({message:"Orders Founded",data:allOrders})
        }
        else{
            return res.status(200).json({message:"Orders Not Found"})
        }
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
module.exports.GetOrderByID= async(req,res)=>{
    try{
        let OrderId=req.params.id;
        let foundedOrder=await OrderModel.findById(OrderId);
        if(foundedOrder){
            return res.status(200).json({message:"Order Founded",data:foundedOrder})
        }
        else{
            return res.status(404).json({message:"Order Not Found"})
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
module.exports.AddOrder=async(req,res)=>{
    try{
        let newOrder=req.body;
        let isValidOrder=OrderValidation(newOrder);
        if(isValidOrder){
            let addedOrder=await OrderModel.create(newOrder);
            return res.status(201).json({message:"Order Added Successfully",data:addedOrder})
        }else{
            return res.status(404).json({message:"Invalid Order Data",details:OrderValidation.errors[0].instancePath.split("/")[1]+":"+OrderValidation.errors[0].message})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
module.exports.UpdateOrderByID=async(req,res)=>{
    try{
        let OrderId=req.params.id;
        let neworder=req.body;
        let foundOrder=await OrderModel.findById(OrderId);
        if(!foundOrder){
            return res.status(404).send("Order Not Found")
        }
        let isValidOrder=OrderValidation(neworder);
        if(isValidOrder){
            
            let updatedOrder=await OrderModel.findByIdAndUpdate(OrderId,neworder,{new:true});
            if(updatedOrder){
                return res.status(200).json({message:"Order Updated Successfully",data:updatedOrder})
            }
        }
        else{
            return res.status(404).json({message:"Invalid Order Data",details:OrderValidation.errors[0].instancePath.split("/")[1]+":"+OrderValidation.errors[0].message})
        }

    }catch(err){
        return res.status(500).json({
            message:err.message})
    }
}

module.exports.deleteOrderByID=async(req,res)=>{
    try{
        let orderId=req.params.id;
        let foundedOrder=await OrderModel.findById(orderId);
        if(!foundedOrder){
            return res.status(404).json({message:"Order Not Found"})
        }
        let deletedOrder=await OrderModel.findByIdAndDelete(orderId);
        if(deletedOrder){
            return res.status(200).json({message:"Order Deleted Successfully",data:deletedOrder})
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
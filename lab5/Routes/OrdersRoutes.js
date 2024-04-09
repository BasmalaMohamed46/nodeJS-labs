const express=require("express");
const routes=express.Router();
const OrdersController=require("../Controllers/OrdersController")

routes.get("/",OrdersController.GetAllOrders);
routes.get("/:id",OrdersController.GetOrderByID);
routes.post("/",OrdersController.AddOrder);
routes.put("/:id",OrdersController.UpdateOrderByID);
routes.delete("/:id",OrdersController.deleteOrderByID);

module.exports=routes
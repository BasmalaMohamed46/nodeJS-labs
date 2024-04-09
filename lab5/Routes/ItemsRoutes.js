const express=require("express");
const routes=express.Router();
const ItemsController=require("../Controllers/ItemsController")


routes.get("/",ItemsController.GetAllItems);
routes.get("/:id",ItemsController.GetItemByID);
routes.post("/",ItemsController.AddItem);
routes.put("/:id",ItemsController.UpdateItemByID);
routes.delete("/:id",ItemsController.DeleteItemByID);

module.exports=routes;

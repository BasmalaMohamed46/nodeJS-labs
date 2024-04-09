const express=require("express");
const routes=express.Router();
const UsersController=require("../Controllers/UsersController");

routes.post("/signup",UsersController.SignUp);
routes.post("/login",UsersController.Login);
routes.get("/",UsersController.GetAllUsers);
routes.get("/:id",UsersController.GetUserByID);
routes.post("/",UsersController.AddUser);
routes.put("/:id",UsersController.UpdateUserByID);
routes.delete("/:id",UsersController.DeleteUserByID);

module.exports=routes;
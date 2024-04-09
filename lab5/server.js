const express=require("express");
const app=express();
const PORT=process.env.PORT||7000;
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const OrdersRoutes=require("./Routes/OrdersRoutes");
const ItemsRoutes=require("./Routes/ItemsRoutes");
const UsersRoutes=require("./Routes/UsersRoutes");
mongoose.connect("mongodb://localhost:27017/ecommerce")


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api/Orders",OrdersRoutes)
app.use("/api/Items",ItemsRoutes)
app.use("/api/Users",UsersRoutes)

app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message})
});


app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT)
})
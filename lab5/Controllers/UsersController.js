const UsersModel=require('../Models/User');
const bcrypt=require('bcrypt');
const UserValidation=require('../Utils/UsersValidation');

module.exports.SignUp=async(req,res)=>{
    try{
        let foundUser=await UsersModel.findOne({Email:req.body.Email.toLowerCase()});
        if(foundUser){
            return res.status(404).json({message:"User Already Exist, Please Login"})
        }
        let userData=req.body;
        let isValidUser=UserValidation(userData)
        if(isValidUser){
            let salt=await bcrypt.genSalt(10);
            userData.Password=await bcrypt.hash(userData.Password,salt)
            userData.Email=userData.Email.toLowerCase();
            let addedUser=await UsersModel.create(userData);
            return res.status(201).json({message:"User Added Successfully",data:addedUser})
        }
        else{
            return res.status(404).json({message:"Invalid User Data",details:UserValidation.errors[0].instancePath.split("/")[1]+":"+UserValidation.errors[0].message})
        }
    }catch(err){
         return res.status(500).json({message:err.message})
    }
};

module.exports.Login=async(req,res)=>{
    try{
        userData=req.body;
        userData.Email=userData.Email.toLowerCase();
        let foundUser=await UsersModel.findOne({Email:userData.Email});
        if(!foundUser){
            return res.status(404).json({message:"Invalid Email / Password"})
        }
        let validPassword=await bcrypt.compare(userData.Password,foundUser.Password);
        if(!validPassword){
            return res.status(404).json({message:"Invalid Email / Password"})
        }
        else{
            return res.status(200).json({message:"Logged-In Successfully"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.GetAllUsers=async(req,res)=>{
    try{
        let allUsers=await UsersModel.find();
        if(allUsers.length > 0){
            return res.status(200).json({message:"Users Founded",data:allUsers})
        }
        else{
            return res.status(200).json({message:"Users Not Found"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.GetUserByID=async(req,res)=>{
    try{
        let id=req.params.id;
        let foundUser=await UsersModel.findById(id);
        if(foundUser){
            return res.status(200).json({message:"User Founded",data:foundUser})
        }
        else{
            return res.status(404).json({message:"User Not Found"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.AddUser=async(req,res)=>{
    try{
        let userData=req.body;
        let isValidUser=UserValidation(userData);
        if(isValidUser){
            let addedUser=await UsersModel.create(userData);
            return res.status(201).json({message:"User Added Successfully",data:addedUser})
        }
        else{
            return res.status(404).json({message:"Invalid User Data",details:UserValidation.errors[0].instancePath.split("/")[1]+":"+UserValidation.errors[0].message})
        } 
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.UpdateUserByID=async(req,res)=>{
    try{
        let id=req.params.id;
        let userData=req.body;
        let foundUser=await UsersModel.findById(id);
        if(!foundUser){
            return res.status(404).json({message:"User Not Found"})
        }
        let isValidUser=UserValidation(userData);
        if(isValidUser){
            isemailExist=await UsersModel.findOne({Email:userData.Email.toLowerCase()});
            if(isemailExist){
                return res.status(404).json({message:"Email Already Exist"})
            }
            let updatedUser=await UsersModel.findByIdAndUpdate(id,userData,{new:true});
            if(updatedUser){
                return res.status(200).json({message:"User Updated Successfully",data:updatedUser})
            }
        }
        else{
            return res.status(404).json({message:"Invalid User Data",details:UserValidation.errors[0].instancePath.split("/")[1]+":"+UserValidation.errors[0].message})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.DeleteUserByID=async(req,res)=>{
    try{
        let id=req.params.id;
        let foundUser=await UsersModel.findById(id);
        if(!foundUser){
            return res.status(404).json({message:"User Not Found"})
        }
        let deletedUser=await UsersModel.findByIdAndDelete(id);
        if(deletedUser){
            return res.status(200).json({message:"User Deleted Successfully",data:deletedUser})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

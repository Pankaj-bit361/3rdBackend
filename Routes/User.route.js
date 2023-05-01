
const express=require("express");
const { UserModel } = require("../Models/User.model")
const bcrypt=require("bcrypt")
const UserRouter=express.Router()
const jwt=require("jsonwebtoken")

UserRouter.post("/register",async(req,res)=>{
    const {email,password,name,age,city,is_married,gender}=req.body
let already=await UserModel.findOne({email})
if(already){
    res.send({"msg":"user already registered, please login"})
}else{
    bcrypt.hash(password, 5, async(err, hash)=> {
        if(hash){          
try {
    let newuser= new UserModel({email,password:hash,name,age,city,is_married,gender})
    await newuser.save()
    res.send({"msg":"user added successfully"})
} catch (error) {
    res.send({"err":error.message})
}
        }else{
            res.send({"err":err.message})
        }
    })
} 
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
let user=await UserModel.findOne({email})
if(user){
   
    bcrypt.compare(password, user.password, async(err, result) => {
        if(result){          
            jwt.sign({authorID:user._id,author:user.name }, "masai", async(err, token)=> {
                if(token){
                    res.send({"msg":"login successfull" ,token})
                }else{
                    res.send({"err":err.message,line:"line40"})
                }
              
              })

        }else{
            res.send({"err":err.message,line:"line 46"})
        }
    })
}else{
    res.send({"err":"invalid crendtials"})
}
   

})



module.exports={
    UserRouter
}
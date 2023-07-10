const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
require('dotenv').config()


const userRouter = express.Router()

//signup
userRouter.post("/register",async(req,res)=>{
    
    const {name,email,password,address} = req.body

    try {
        const isUserPresent = await userModel.findOne({email}) 
       if(isUserPresent) return res.send("User is already Present, Please loging ")

        const hash = await bcrypt.hash (password,8)

        const user = new userModel({name,email,password:hash,address})
        await user.save()

        res.status(201).send({"message":"User is Succesfully SignUp"})
        
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
  
    try {
        const user = await userModel.findOne({email})
        if(!user){
          return  res.status(401).send({message:"user is not register"})
        }
      
        
        const isPasswordCorrect  =await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) return res.status(400).send({message:"Password is not correct"})

        const token = jwt.sign({id:user._id},"secretKey",{
            expiresIn: "10m"
        })
    

         res.cookie("AccessToken",token,{maxAge:2000*60})

        res.status(200).send({message:"loging succesfull!",token})


    } catch (err) {
        res.status(400).send({message:err.message})
    }
})

userRouter.patch("/user/:id/reset",async(req,res)=>{
    const {id} = req.params
    const {password}=req.body
   try {      
      

       const hash = await bcrypt.hash (password,8)

    //    const user = new userModel({name,email,password:hash,address})
    let hashPass = {password:hash}

       const data = await userModel.findByIdAndUpdate({_id:id},hashPass);
       
       res.status(204).send({message:"Password is updated",data})
   } catch (error) {
       res.status(400).send({message:error.message})
   }
})

module.exports={
    userRouter
}
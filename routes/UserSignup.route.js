const express=require("express")
const bcrypt=require("bcrypt")
const { UserModel } = require("../models/User.model")


const UserSignupRouter=express.Router()

UserSignupRouter.post("/",async(req,res)=>{
    const {email,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err,secure_password)=>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel ({email,password:secure_password})
                await user.save()
                res.send("Registered")
            }
        })
    }catch(err){
        console.log(err)
        console.log("Error in registering the user")
    }
})

module.exports={UserSignupRouter}
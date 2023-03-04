const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/User.model")
require("dotenv").config()

const UserSigninRouter=express.Router()

UserSigninRouter.post("/",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        const hased_password=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hased_password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credentials")
        }
    }catch(err){
        console.log(err)
        console.log("Something went wrong")
    }
})

module.exports={UserSigninRouter}
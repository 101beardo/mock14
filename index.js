const express= require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { UserSignupRouter } = require("./routes/userSignup.route")
const { UserSigninRouter } = require("./routes/UserSignin.route")

require("dotenv").config()

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/signup",UserSignupRouter)
app.use("/signin",UserSigninRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Server running at ${process.env.port}`)
})
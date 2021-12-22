const User = require("../models/userModels")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')

exports.home =  (req,res)=>{
    res.json({
        "success" : "true"
    })
}

exports.createUser =  async(req,res)=>{
const user = await User.create({
    "name" : "thiru",
    "password" : "passowrd"
})  
res.json({
    "success" : "true"
})

}


exports.signIn =  asyncHandler(async(req,res)=>{



    const { name , password } = req.body

    const user = await User.findOne({"name" : name})

    if(user){

       if(user.password===password){
        const token = await jwt.sign({ id : user._id} , process.env.SECRET_WORD)
        res.json({"id" : user._id ,
           "name" : user.name, 
            'token' : token})
       }
       else{
           res.status(401)
           throw new Error("User or Password is not correct")
           return
           
       }
        
    }
    else
    {
        res.status(401)
        throw new Error("User not found")
        return
           

    }

    
    
})
const pool = require("../Config/postConfig")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')

exports.home =  (req,res)=>{
    res.json({
        "success" : "true"
    })
}

exports.createUser =  async(req,res)=>{


const user = await pool.query(`INSERT INTO users (name,password) VALUES ('admin','admin')`)

res.json({
    "success" : "true"
})

}


exports.signIn =  asyncHandler(async(req,res)=>{

    

    const { name , password } = req.body

    const data = await pool.query(`SELECT * FROM users WHERE name='${name}';`)

    const user = data.rows[0]


    if(user){

       if(user.password===password){
        const token = await jwt.sign({ id : user.id} , process.env.SECRET_WORD)

        res.json({"id" : user.id ,
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
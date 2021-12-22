const User = require("../models/userModels")
const pool = require("../Config/postConfig")
const jwt = require("jsonwebtoken")
exports.isLogin = async(req,res,next) =>{
    
    try{

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            let token = req.headers.authorization.split(" ")[1]
            let dectoken = jwt.verify(token , process.env.SECRET_WORD)
           
            let id = dectoken.id
            
            const data = await pool.query(`SELECT * FROM users WHERE id='${id}'`)
            const user = data.rows

            if(user)
            {
                next()
            }
            else{
                res.status(401)
                res.send("Not authorized")
            }
    
        }
        else{
                res.status(401)
                res.send("Not authorized")
    
        }

    }
    catch(error){

        res.status(401)
        res.json(error.message)

    }
}
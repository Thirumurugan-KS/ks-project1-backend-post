const User = require("../models/userModels")
exports.isLogin = async(req,res,next) =>{
    const jwt = require("jsonwebtoken")
    try{

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            let token = req.headers.authorization.split(" ")[1]
            let dectoken = jwt.verify(token , process.env.SECRET_WORD)
            let id = dectoken.id
            const user = await User.findById(id)
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
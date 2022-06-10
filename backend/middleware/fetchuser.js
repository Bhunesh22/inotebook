var jwt = require('jsonwebtoken');

const JWT_SECRET = "jsisreallyhard!tounderstand#"

const fetchuser = (req,res, next)=>{
    // Get the user from the jwt token and add to req object, here we get the token from header of the thunderClint and use to fetch clint details form token
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()

    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }

    }

    



module.exports = fetchuser;
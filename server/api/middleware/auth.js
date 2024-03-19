const jwt = require('jsonwebtoken')
require('dotenv').config()
const authorization = (req,res,next)=>{
    console.log('autj')
    const {authorization} = req.headers
    if(!authorization || !authorization.startsWith('Bearer')){
        throw new Error('dd')
    }
    
    try {
        
        const token = authorization.split((' '))[1]
        
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        const {uid}=decode
        
        req.user = {uid}
        
        
        next()
    } catch (error) {
        throw error
    }
}

module.exports = authorization
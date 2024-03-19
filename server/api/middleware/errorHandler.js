const CustomApiError = require("../errors/customErrorApi")
const {StatusCodes} = require('http-status-codes')
const errorHandler = (err,req,res,next)=>{

    if(err instanceof CustomApiError ){
        return res.status(err.statusCode).json({success:false,msg:err.message,error:err})
    }
    console.log(err)
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,msg:'Something went wrong',error:err})
}

module.exports = errorHandler
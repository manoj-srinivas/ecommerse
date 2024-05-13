import { StatusCode } from "./constants.js"


    export const responseSuccess = async(req,res,message,statusCode = StatusCode.OK,data) => {
        res.status(statusCode).json({
            success: true,
            message: !message? 'Query was successfull': message,
            data
        })
    }
    
    export const responseFailure = async(req,res,message,statusCode = StatusCode.NOT_FOUND,data) => {
        res.status(statusCode).json({
            success: true,
            message: !message? 'Something went wrong': message,
            data
        })
    }
    
    export const responseError = async(res, message, statusCode) => {
        res.status(statusCode).json({
            success: false,
            message: !message? 'Something went wrong': message,
            data: null
        })
    }
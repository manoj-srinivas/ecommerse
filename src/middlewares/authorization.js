import  jwt  from "jsonwebtoken"
import { SECRET_KEY, StatusCode } from "../helpers/constants.js";
import { responseFailure } from "../helpers/response.js";

export const generateToken = (user) =>{
    return jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: '1d',
    });
}

export const verifyToken = (req,res,next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        responseFailure(req,res,"Invalid token",StatusCode.UNAUTHORIZED,[])
    }
}
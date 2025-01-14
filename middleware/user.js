const {JWT_USER_PASSWORD} = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req,res,next){
    const {authHeader} = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,JWT_SECRET_PASSWORD);
        if(decoded){
            req.userId = decoded._id;
            next();
        }else{
            res.status(403).json({
                message:"You are not signed in"
            })
        }
    }else{
        res.status(401).json({
            success:false,
            message:'Token is not provided',
        });
    }
}
module.exports = userMiddleware ;
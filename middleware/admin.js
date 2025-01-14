const {JWT_admin_PASSWORD} = require("../config");
const jwt = require('jsonwebtoken');

function adminMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,JWT_admin_PASSWORD);
        if(decoded){
            req.adminId = decoded._id;
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

module.exports = adminMiddleware;
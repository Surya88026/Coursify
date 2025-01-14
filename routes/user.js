const  express = require("express");
const {UserModel, purchaseModel, CourseModel} = require("../db"); 
const {z} = require("zod");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");
const userMiddleware = require("../middleware/user");

const signbody = z.object({
    username:z.string().min(1,{message:"Username cannot be empty"}),
    password:z.string().min(7),
})

router.post("/signup",async (req,res)=>{
    const {username,password }= req.body;
    const validationResult  = signbody.safeParse(req.body);
    if(!validationResult.success){
        return res.json({message:"please signup with correct credentials"})
    }
    const hashedPassword = await bcrypt.hash(password,3); 
    
    await UserModel.create({
        username:username,
        password:hashedPassword,
    })

    res.json({
        message:"you are signedup"
    })
})
router.post("/signin",async (req,res)=>{
    const {username,password} = req.body ;
    const user = await UserModel.findOne({
        username:username
    })
    if(!user){
        return res.json({message:"User Not Found"});
    }
    const check = await bcrypt.compare(password,user.password);
    if(!check){
        return res.json({message:"Wrong Credentials!"})
    }

    const token = jwt.sign({id:user._id},JWT_USER_PASSWORD);
    return res.json({token})

})


router.get("/purchase",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId,
    })
    // ugly approach find coursesDAta of the _id from the given array created by .map
    const courseData = await CourseModel.find({
        _id: {$in : purchases.map(x => x.courseId)}
    })

    res.json({
        purchases,
        courseData
    })
})


module.exports = router ; 

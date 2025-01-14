
const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const { adminModel, CourseModel } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const {JWT_admin_PASSWORD} = require(("../config"))



const signbody = z.object({
    username:z.string().min(1,{message:"Username cannot be empty"}),
    password:z.string().min(7),
})

router.post("/signup",async (req,res) => {

    const { username,password } = req.body;
    const validationResult = signbody.safeParse(req.body);

    if(!validationResult.success){
        return res.json({message:"please signup with correct credentials"})
    }
    const hashedPassword = await bcrypt.hash(password,3); 
    
    await adminModel.create({
        username:username,
        password:hashedPassword,
    })

    res.json({
        message:"you are signedup"
    })


})

router.post("/signin",async (req,res) => {
    const {username,password} = req.body ;
    const admin = await adminModel.findOne({
        username:username
    })
    if(!admin){
        return res.json({message:"Admin User Not Found"});
    }
    const check = await bcrypt.compare(password,admin.password);
    if(!check){
        return res.json({message:"Wrong Credentials!"})
    }

    const token = jwt.sign({id:admin._id},JWT_admin_PASSWORD);
    return res.json({token})
})
router.post("/course",adminMiddleware,async(req,res)=>{
    adminId = req.adminId ;
    const {title,description,imageUrl,price} = req.body;
    const course = await CourseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"course created",
        courseId:course._id
    })
})
router.put("/course",adminMiddleware,async (req,res)=>{
    const adminId = req.adminId;

    const {title,description,imageUrl,price,courseId} = req.body;
    const course = await CourseModel.updateOne({
        _id:courseId,
        creatorId: adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
    })
    res.json({
        message:"course updated",
        courseId:course._id
    })
})
router.get("/course/bulk",adminMiddleware,async (req,res)=>{
    const adminId = req.adminId;
    const courses = await CourseModel.find({
        creatorId:adminId
    })
    res.json({
        courses
    })
})


module.exports = router ;

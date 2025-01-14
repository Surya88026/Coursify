const {Router} = require("express");
const {userMiddleware} = require("../middleware/user");
const { purchaseModel, CourseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
    // should check here for success of payments
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message:"You have successFully bought the course"
    })
})

courseRouter.get("/preview",async (req,res) => {
    const courses = await CourseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    courseRouter:courseRouter
}
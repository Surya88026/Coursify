const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    username:String ,
    password:String,
})

const admin = new Schema({
    username:{type:String , unique:true} ,
    password:String,
})

const Course = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:mongoose.Types.ObjectId

})

const purchase = new Schema({
    courseId:mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId
})

const userModel = mongoose.model("User",User);
const adminModel = mongoose.model("admin",admin);
const CourseModel = mongoose.model("Course",Course);
const purchaseModel = mongoose.model("purchase",purchase); 

module.exports = {
    userModel,
    adminModel,
    CourseModel,
    purchaseModel
}
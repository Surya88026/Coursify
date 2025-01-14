require('dotenv').config()
const express = require("express");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const {mongoose} = require("mongoose");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors);

app.use("api/v1/admin",adminRouter);
app.use("api/v1/user",userRouter);


async function main(){
    
    await mongoose.connect(process.env.MONGO_URL + '/coursera');
    app.listen(8080);
}
main();


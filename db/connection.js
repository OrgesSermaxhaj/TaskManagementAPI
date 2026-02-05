const mongoose = require("mongoose");
require("dotenv").config();


const databaseString = process.env.mongoURL;
const mongoDbConnection = mongoose.connect(databaseString).then(()=>{
    console.log("Connection to db success!")
}).catch((err)=>{
    console.log("Could not connect to DB", err);
});


module.exports = mongoDbConnection;
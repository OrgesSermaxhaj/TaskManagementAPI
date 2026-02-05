const express = require("express");
const mongoDbConnection = require("./db/connection")
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
mongoDbConnection.then(()=>{
    console.log("test")
}).catch((err)=>{
    console.log(err)
});
app.use(express.json());


app.listen(PORT, ()=>{
    console.log("Server started on port 3000.")
})
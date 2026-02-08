const express = require("express");
const mongoDbConnection = require("./db/connection")
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/user', require('./routes/user.routes'));
// app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/task', require('./routes/task.routes'));
app.use('/api/project', require('./routes/project.routes'));

mongoDbConnection.then(()=>{
    console.log("test")
}).catch((err)=>{
    console.log(err)
});



app.listen(PORT, ()=>{
    console.log("Server started on port 3000.")
})
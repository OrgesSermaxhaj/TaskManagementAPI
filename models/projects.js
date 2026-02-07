const  mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
 
    Name: {
       type: String,
       required: true
    },
    Description: {
       type: String,
       required: true
    },
    createdFrom: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
         },
     },
  { timestamps: true }
);

const Projects = mongoose.model('Project', projectsSchema);
module.exports = Projects;
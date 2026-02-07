const  mongoose = require('mongoose');

const projectMembersSchema = new mongoose.Schema({
 
  project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true
     },
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

})


const ProjectMembers = mongoose.model('ProjectMember', projectMembersSchema);
module.exports = ProjectMembers;
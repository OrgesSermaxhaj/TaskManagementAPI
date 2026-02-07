const  mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({

     title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true
    },
    
     project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          required: true
     },

     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true  //admini pritet mi kriju
    },

      assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date
       }
    },
    
  { timestamps: true }
);


const Tasks = mongoose.model('Task', tasksSchema);
module.exports = Tasks;
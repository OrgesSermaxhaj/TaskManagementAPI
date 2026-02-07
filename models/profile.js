const  mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUsername:{
        type: String
    },
    social:{
        youtube: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
    },
    date:{
        type: Date,
        default: Date.now
        
    }

});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
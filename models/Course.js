const mongoose = require('mongoose')
//define schema
const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

    number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },

    gender:{
        type:String,
        required:true,
    },

    qualification:{
        type:String,
        required:true,
    },

    user_id:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:'Pending'
    },
    comments:{
        type:String,
        default:'none'
    },
    image:    
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
      },
    }
},
{timestamps:true})

//create collection
const CourseModel = mongoose.model('course',CourseSchema)
module.exports = CourseModel;
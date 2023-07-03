const mongoose = require('mongoose')
// const url ="mongodb://0.0.0.0:27017/Practicemern"
const live_url = 'mongodb+srv://anujj1237:<anujj1237>@cluster0.xolnjke.mongodb.net/'
const connectDB=()=>{
    // For local DB
    return mongoose.connect(url)


    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=connectDB
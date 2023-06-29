const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')


const checkuserauth = async(req,res,next)=>{
    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'unauthorized User !');
        res.redirect('/')
    }
    else{
        const verify = jwt.verify(token,'anujjain@123#')
        // console.log(verify)
        const user = await UserModel.findById(verify.ID)
        // console.log(user)
        req.user = user
        next()
    }

}

module.exports = checkuserauth
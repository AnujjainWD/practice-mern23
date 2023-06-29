const CourseModel = require('../../models/Course')
const UserModel = require('../../models/User')

class AdminController{

    static dashboard = async (req,res) => {
        try {
            const{name,email,_id,image,mobile,status} = req.user
            const course = await CourseModel.find()
            // console.log(course)
            res.render('admin/dashboard',{n:name,c:course,id:_id,e:email,image:image,m:mobile,s:status})
        } catch (error) {
            console.log('error')
        }
    }

    static profile_view = async(req,res)=>{
        try {
            
            const{name,email,_id,mobile,image} = req.user 

            const data = await CourseModel.find()
            // console.log()
            res.render('admin/profile_view',{n:name,d:data,id:_id,e:email,image:image,m:mobile})
        } catch (error) {
            console.log(error)
        }
    }

    static update_approve = async(req,res)=>{
        try {
            const update = await CourseModel.findByIdAndUpdate(req.params._id,{
                status:req.body.status,
                comments :req.body.comments,
            })
            //  console.log(req.body);
            res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AdminController
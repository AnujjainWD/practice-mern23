const CourseModel = require("../models/Course")

class CourseController {
    static course_insert = async(req,res)=>{
        try {
     console.log(req.body)
        const result = new CourseModel({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            address: req.body.address,
            gender: req.body.gender,
            qualification: req.body.qualification,
            course:req.body.course,
            user_id:req.user.id
        })
        await result.save()
        req.flash('success','Registered Succesfully !')
        res.redirect('/course_display')
        } catch (error) {
            console.log(error)
        }
    }

        static Course_display = async(req,res)=>{
            try {
                const{name,email,id,image} = req.user
                const data = await CourseModel.find({user_id:id})
                // console.log(data);
                res.render('courses/display',{d:data,message:req.flash('success'),n:name,image:image});
            } catch (error) {
                console.log(error)
            }
        }
    
        static course_view = async(req,res)=>{
            try {

                // console.log(req.params.id)
                const{name,email,_id,image} = req.user
                const data = await CourseModel.findById(req.params.id)
                // console.log(data);
                res.render('courses/view',{d:data,n:name,image:image});
                
            } catch (error) {
                console.log(error)
            }
        }
    
        static course_edit = async(req,res)=>{
            try {
                const{name,email,_id,image} = req.user
                // console.log(req.params.id)
                const data = await CourseModel.findById(req.params.id)
                // console.log(data);
                res.render('courses/edit',{d:data,n:name,image:image});
                
            } catch (error) {
                console.log(error)
            }
        }
    
        static course_update = async(req,res)=>{
            try{
                // console.log(req.body)
                // console.log(req.params.id)
                const update = await CourseModel.findByIdAndUpdate(req.params.id,{

                    name:req.body.name,
                    email:req.body.email,
                    number:req.body.number,
                    address:req.body.address,
                    gender:req.body.gender,
                    qualification:req.body.qualification,
                    course:req.body.course

                })
                req.flash('success', 'Updated Successfully !')


                res.redirect('/course_display')
            }catch(error){
                console.log(error)
            }
        }

        static course_delete = async(req,res)=>{
            try{
                // console.log(req.body)
                // console.log(req.params.id)
                const update = await CourseModel.findByIdAndDelete(req.params.id)
                req.flash('success', 'Delete Successfully !')

                res.redirect('/course_display')
            }catch(error){
                console.log(error)
            }
        }

        
}
module.exports = CourseController
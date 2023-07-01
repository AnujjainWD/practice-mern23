const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const CourseModel = require('../models/Course')


cloudinary.config({
    cloud_name: 'ddb7jubdi',
    api_key: '981393513955296',
    api_secret: 'tq_dRaC0uDabPcp6WXtjtyBbass',
});


class FrontController {
    static home = (req, res) => {
        res.render("home")
    }
    static about = (req, res) => {
        res.render("about")
    }
    static login = (req, res) => {
        res.render("login", { message: req.flash('success'), error: req.flash("error") })
    }
    static registration = (req, res) => {
        res.render("registration", { message: req.flash('error') })
    }
    static dashboard = async (req, res) => {

        try {
            // console.log(req.user)
            const {name,email, _id,image } = req.user
            res.render("dashboard", { n:name, image:image })
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
          const { name, email, _id, image ,mobile } = req.user;
          const data = await UserModel.find()
          res.render('about',{n:name,image:image,id:_id,e:email,m:mobile,d:data});
        } catch (error) {
          console.log(error);
        }
      };
    
      static course = async (req, res) => {
        try {
          const { name, email, _id, image ,mobile } = req.user;
          const data = await UserModel.find()
          res.render('course',{n:name,image:image,id:_id,e:email,m:mobile,d:data});
        } catch (error) {
          console.log(error);
        }
      };


    static insert = async (req, res) => {
        // console.log(req.files.image)
        const file = req.files.image
        const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'studentimage'
        })
        console.log(imageupload)

        const { name, email, password, c_password } = req.body

        const user = await UserModel.findOne({ email: email })
        //     // console.log(user)
        if (user) {
            req.flash('error', 'Email already Exist !')
            res.redirect('/registration')


        }
        else {
            if (name && email && password && c_password) {
                if (password == c_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: imageupload.public_id,
                                url: imageupload.secure_url
                            }

                        })
                        await result.save()
                        req.flash('success', 'Registration Successfully ! Please Login here ')
                        res.redirect('/')

                    } catch (error) {
                        console.log(error)
                    }


                }
                else {
                    req.flash('error', 'password and confirm password does not match !')
                    res.redirect('/registration')

                }

            } else {
                req.flash('error', 'All Fields Are Required !')
                res.redirect('/registration')


                //         }
                //     }
                //     const result = new UserModel({
                //         name:req.body.name,
                //         email:req.body.email,
                //         password:req.body.password

                //     })
                //     await result.save()
                //     req.flash('success', 'Registration Successfully ! Please Login here ')
                //     res.redirect('/')

                // }


                // static login = (req,res)=>{
                //     res.send("hello login ")
                // }

            }
        }
    }
    static verify_login = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const ismatch = await bcrypt.compare(password, user.password)
                    if (ismatch) {
                        //multiple Login
                        if (user.role == 'student') {
                            const token = jwt.sign({ ID: user._id }, 'anujjain@123#');
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')

                        }
                        if(user.role == 'admin'){
                            const token = jwt.sign({ ID: user._id }, 'anujjain@123#');
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('admin/dashboard')

                        }



                        // generate token here 

                    } else {
                        req.flash('error', 'email and password does not match !');
                        res.redirect('/');

                    }

                } else {
                    req.flash('error', 'you are not a register user !');
                    res.redirect('/');

                }

            } else {
                req.flash('error', 'All Fields Are Required !');
                res.redirect('/');


            }
            // console.log(req.body)

        } catch (error) {
            console.log(error);

        }
    }

    static profile = async (req, res) => {
        try {
          const { name, email, _id, image ,mobile } = req.user;
          const data = await UserModel.find()
          res.render('profile',{n:name,image:image,id:_id,e:email,m:mobile,d:data});
        } catch (error) {
          console.log(error);
        }
      };

    static contact = async (req, res) => {
        try {
          const { name, email, _id, image ,mobile } = req.user;
          const data = await UserModel.find()
          res.render('contact',{n:name,image:image,id:_id,e:email,m:mobile,d:data});
        } catch (error) {
          console.log(error);
        }
      };
    

    static change_password = async (req, res) => { 
        try {
          const { name, email, id, image } = req.user;
          // console.log(req.body)
          const { oldpassword, newpassword, cpassword } = req.body;
          if (oldpassword && newpassword && cpassword) {
            const user = await UserModel.findById(id);
            const ismatch = await bcrypt.compare(oldpassword, user.password);
            if (!ismatch) {
              req.flash("error", "Old Password is incorrect");
              res.redirect("/profile");
            } else {
              if (newpassword !== cpassword) {
                req.flash("error", "password does not match");
                res.redirect("/profile");
              } else {
                const newHashpassword = await bcrypt.hash(newpassword, 10);
                await UserModel.findByIdAndUpdate(id, {
                  $set: { password: newHashpassword },
                });
                req.flash("success", "password changed succesfully");
                res.redirect("/profile");
              }
            }
          } else {
            req.flash("error", "Incorrect password");
            res.redirect("/profile");
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    

    static profile_update = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);
    
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "Admissionabhay",
    
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
    
                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
      };

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    // static dashboard = async (req,res) => {
    //     try {
    //         const{name,email,_id,image,mobile,status} = req.user
    //         const course = await CourseModel.find()
    //         // console.log(course)
    //         res.render('admin/dashboard',{n:name,c:course,id:_id,e:email,image:image,m:mobile,s:status})
    //     } catch (error) {
    //         console.log('error')
    //     }
    // }

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

    static profile_update = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);
    
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "Admissionabhay",
    
                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
    
                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
      };
    

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

static sendEmail = async (name, email) => {
    // console.log("email sending")
    //consollog("propertyName")
    // console.log(email)
  
    //connenct with the smtp server
  
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
  
      auth: {
        user: "sujaljha007@gmail.com",
        pass: "uqltlwovtuaovloc",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Create course Registration Succesfully", // Subject line
      text: "hello", // plain text body
      html: `<b>${name}</b> Registration is successful! please login.. `, // html body
    });
    //console.log("Messge sent: %s", info.messageId);
  };
  

}

module.exports = FrontController



const express = require('express')
const CourseController = require('../controllers/CourseController')
const { course_insert } = require('../controllers/CourseController')
const FrontController = require("../controllers/FrontController")
const router = express.Router()
const checkuserauth = require('../middleware/auth')
const AdminController = require('../controllers/admin/AdminController')
const islogin = require('../middleware/islogin')



//front controller
router.get('/',islogin,FrontController.login)
router.post('/change_password',checkuserauth,FrontController.change_password)
router.get("/",FrontController.login)
router.get("/registration",FrontController.registration)
router.post('/insert',FrontController.insert)
router.get('/dashboard',checkuserauth,FrontController.dashboard)
router.post("/verify_login",FrontController.verify_login)
router.get("/Logout",FrontController.logout)
router.post('/profile_update',checkuserauth,FrontController.profile_update)
router.get('/profile',checkuserauth,FrontController.profile)


// router.get("/login",FrontController.login)
//course controller

router.post('/course_insert',checkuserauth,CourseController.course_insert);
router.get('/course_display',checkuserauth,CourseController.Course_display);
router.get('/course_view/:id',checkuserauth,CourseController.course_view)
router.get('/course_edit/:id',checkuserauth,CourseController.course_edit)
router.post('/course_update/:id',checkuserauth,CourseController.course_update)
router.get('/course_delete/:id',checkuserauth,CourseController.course_delete)


//admincontroller
router.get('/admin/dashboard',checkuserauth,AdminController.dashboard)
router.get('/admin/profile_view/:_id',checkuserauth,AdminController.profile_view);
router.post('/admin/update_approve/:_id',checkuserauth,AdminController.update_approve);


module.exports=router
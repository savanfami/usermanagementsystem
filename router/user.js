const express = require('express')
const router = express.Router()
const controller = require('../Controller/controller')
const user = require("../model/db")






router.get('/', controller.tologin)
router.get("/signUp", controller.signup)
router.post("/submit", controller.insertuser)
router.get("/tologin", controller.signin)
router.get('/logout', controller.logout)
router.post('/userlogin', controller.login)
router.post("/adminpage", controller.adminlog)
router.get('/adminlogin', controller.admin)
router.post('/adminlog', controller.adminlog)
router.get('/toadminPage', controller.adminpage)
router.get('/dashboard', controller.dash)
router.post('/adduser', controller.insert)
router.get('/edit/:id', controller.edit)
router.post('/editUser/:id', controller.edited)
router.get('/del/:id', controller.del)
router.post('/search', controller.search)
router.get('/add', controller.add)
router.get('/home', controller.admintohome)
router.get('/basetosignup',controller.basetosignup)




module.exports = router
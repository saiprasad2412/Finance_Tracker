const express=require('express');
const router=express.Router();
const {registerUser,loginUser, logOutUser}=require('../controllers/user.controller');
const { JWTverify } = require('../middlewares/auth.middleware');
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',JWTverify,logOutUser)
module.exports=router
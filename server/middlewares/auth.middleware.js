const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// exports.JWTverify= (req, res, next) => {
//     console.log("inside authorized ")
//     const tokenn = req.cookie.accessToken
//     console.log("token",tokenn);
//     next()
// };

exports.JWTverify =  (req, res, next) => {
    try {
       console.log("inside authorized ",req.cookie) 
       //req.cookies.accessToken
        const token = req.cookie;
        console.log("token",token);
        next()
    } catch (error) {
        throw error?.message;

    }
};

// async(req,res)=>{
//     try {
//         console.log("hehjndv",req)
//         const token=  req.cookies.accessToken
//         console.log("token",token);
//         if(!token){
//             return res.status(401).json({message:" Token  not found"})
//         } 
//         const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
//         const user = await User.findById(decodedToken._id).select("-password -refreshToken");
//         if(!user){
//             return res.status(401).json({message:"Unauthorized user"})
//         }
//         req.user=user
//         next()
            
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({message:"Unauthorized Token"})
//     }
// }
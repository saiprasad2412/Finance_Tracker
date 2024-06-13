const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// exports.JWTverify= (req, res, next) => {
//     console.log("inside authorized ")
//     const tokenn = req.cookie.accessToken
//     console.log("token",tokenn);
//     next()
// };

exports.JWTverify = async (req, res, next) => {
    try {
        // authenticate user
        console.log("inside authorized ")
        const authHeader = req.cookies.accessToken;
        // const token = authHeader && authHeader.split(" ")[1];

        console.log("token", authHeader);

        if (!token) {
            return res.status(401).json({ message: " Token  not found" })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}

// async (req, res) => {
//     try {
//         console.log("hehjndv", req)
//         const token = req.cookies.accessToken
//         console.log("token", token);
//         if (!token) {
//             return res.status(401).json({ message: " Token  not found" })
//         }
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         const user = await User.findById(decodedToken._id).select("-password -refreshToken");
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized user" })
//         }
//         req.user = user
//         next()

//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: "Unauthorized Token" })
//     }
// }
const User= require('../models/user.model')

exports.generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
exports.registerUser = async (req, res) => {
    const {name , email , password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const newUser= new User (req.body);
        await newUser.save();

        res.status(201).json({message:"User created successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
exports.loginUser=async(req,res)=>{
    const {email , password}=req.body;
    if(!email && !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
        
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"})
        }
        const {accessToken, refreshToken} = await this.generateAccessAndRefereshTokens(user._id)
        console.log('accessToken',accessToken);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({message:"User logged in successfully",loggedInUser, accessToken,refreshToken})  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}
exports.logOutUser=async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            },
            
        },
        {new:true}
        
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}
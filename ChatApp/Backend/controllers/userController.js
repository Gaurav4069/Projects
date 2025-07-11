import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
  try {
    const {fullName,username,password,confirmPassword,gender}=req.body;
    if(!fullName|| !username|| !password|| !confirmPassword|| !gender){
      return res.status(400).json({message:"All fields are required"});
    }
    if(password !== confirmPassword){
      return res.status(400).json({message:"password do not match"});
    }
    
     const user = await User.findOne({username})
     if(user){
      return res.status(400).json({message:"username already exist"})
     }
     
     const hashedPassword = await bcrypt.hash(password,10);

     const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
     const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;



     await User.create({
      fullName,
      username,
      password:hashedPassword,
      profilePhoto:gender==="male"?maleProfilePhoto:femaleProfilePhoto,
      gender
     });
     return res.status(201).json({
      message:"Account created successfully",
      success: true
     })

  } catch (error) {
    console.log(error);
  }
}







export const login = async (req,res)=>{
  try {
    const {username,password}=req.body;
    if(!username || !password){
      return res.status(400).json({ message:"all fields are required"})
    };
    const user = await User.findOne({username});
    if(!user){
      return res.status(400).json({message: "incorrect username or password",
        success: false
      })
    };

    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      return res.status(400).json({message: "incorrect username or password",
        success: false
      })
    };
 
    const tokenData={
        userId:user._id
    };

    const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
    
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000 , httpOnly:true, sameSite:"strict"}).json({
      _id:user._id,
      username:user.username,
      fullName:user.fullName,
      profilePhoto:user.profilePhoto
    });


  } catch (error) {
    console.log(error);
  }
}


export const logout = (req,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"logged out successfully"
    })
  } catch (error) {
    console.log(error)
  }
}




export const getOtherUsers = async (req,res)=>{
  try {
    const loggedInUserId =req.id;
    // yaha pe $ne ek operator hai aur ne ka mtlb hai not equal to ye find statement sare users return kr dega jo ki loggedin user ke id se match nhi honge aur sath me us user ke password ko reject kr dega
    const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error)
  }
}
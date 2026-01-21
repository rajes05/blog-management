import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import genToken from "../utils/genToken.js";

export const signUp = async(req, res)=>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName ||!email ||!password){
            return res.status(400).json({message:"All fields are required !"});
        }
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User with this email already exists !"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({
            fullName,
            email,
            password:hashedPassword
        });
        await user.save();

        return res.status(201).json({message:"SignUp sucessfully !",user})

    } catch (error) {
        return res.status(500).json({message:`Create account error${error}`});
    }
}

export const signIn = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required !"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password !"});
        }
        const jwtToken = genToken(user._id);

        return res.status(200).json({
            message:"Login sucessfully !",
            jwtToken
        })
    } catch (error) {
        return res.status(500).json({message:`Login error ${error}`});
    }
}

export const getAllUser = async(req, res)=>{
    res.json({message:"get all user"});
}
import User from "../models/user.model.js";

export const createUser = async(req, res)=>{
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
    } catch (error) {
        return res.status(500).json({message:`Create account error${error}`});
    }
}

export const getAllUser = async(req, res)=>{
    res.json({message:"get all user"});
}
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timeseries:true});

const User = mongoose.model("User", userSchema);
export default User;
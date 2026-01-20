import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    category:{
        type:String,
        enum:['Technology','Health','Travel','Food','Lifestyle','Other'],
        default:'Other'
    }

},{timestamps:true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
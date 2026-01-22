import Blog from "../models/blog.model.js";

export const createBlog = async(req, res)=>{
    try {
        const {title, content, category } = req.body;
        const autherId = req.user.userId; // get autherId from authenticated user (authentication middleware)
        if(!title ||!content ){
            return res.status(400).json({message:"Title and Content are required !"});
        }
        const newBlog = new Blog({
            title,
            content,
            auther:autherId,
            category:category || 'other',

        })
        await newBlog.save();

        //populate to get related data
        await newBlog.populate('auther','fullName email');

        return res.status(201).json({
            message:"New Blog created sucessfully !",
            newBlog
        })
    } catch (error) {
        return res.status(500).json({message:`Create new blog error: ${error}`});
    }
}

export const getAllBlogs = async(req, res)=>{
    try {
        const allBlogs = await Blog.find()
        .populate('auther', 'fullName email')
        .sort({createdAt:-1}); //newest first

        return res.status(200).json({
            message:"Got all blogs sucessfully !",
            count:allBlogs.length,
            allBlogs
        })
    } catch (error) {
        return res.status(500).json({message:`Get all blogs error: ${error}`});
    }
}

export const blogsOfAuther = async(req, res)=>{
    
}
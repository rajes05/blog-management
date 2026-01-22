import { populate } from "dotenv";
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

export const getAutherBlogs = async(req, res)=>{
    try {
        const autherId = req.user.userId; // from authenticated user (authentication middleware)
        const autherBlogs = await Blog.findOne({auther:autherId})
        //to get data related
        .populate('auther','fullName email')
        .sort({createdAt:-1})

        return res.status(200).json({
            message:"Sucessfully got auther blogs !",
            count:autherBlogs.length,
            autherBlogs
        })
    } catch (error) {
        return res.status(500).json({
            message:`Get auther blogs error: ${error}`
        })
    }
}

export const updateBlog = async(req, res)=>{
    try {
        const {title, content, category} = req.body;
        const blogId = req.params.blogId;
        const autherId = req.user.userId; 

        const blog = await Blog.findOne({
            _id:blogId,
            auther:autherId
        });
        if(!blog){
            return res.status(404).json({message:"Blog not found or you are not authorized !"});
        }
        //update fields 
        if(title) blog.title = title;
        if(content) blog.content = content;
        if(category) blog.category = category;

        await blog.save();

        await blog.populate('auther','fullName email')

        return res.status(200).json({
            message:"Blog updated sucessfully !",
            blog
        })

    } catch (error) {
        return res.status(500).json({message:`Update blog error: ${error}`})
    }
}

export const deleteBlog = async(req, res)=>{
    try {
        const blogId = req.params.blogId;
        const autherId = req.user.userId;

        const blog = await Blog.findOne({
            _id:blogId,
            auther:autherId
        });
        if(!blog){
            return res.status(404).json({
                message:"Blog not found or you are not authorized !"
            });
        }
        await Blog.deleteOne({
            _id:blogId,
            auther:autherId
        })
        return res.status(200).json({
            message:"Blog deleted sucessfully !",
            blog
        })
    } catch (error) {
        return res.status(500).json({message:`Delete blog error: ${error}`});
    }
}
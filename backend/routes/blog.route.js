import express from 'express';
import { createUser, getAllUser } from '../controllers/blog.controller.js';
const blogRouter = express.Router();

blogRouter.get('/get',getAllUser);
blogRouter.post('/create-account',createUser);

export default blogRouter;
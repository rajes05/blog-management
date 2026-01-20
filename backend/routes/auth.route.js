import express from 'express';
import { getAllUser, signIn, signUp } from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.get('/get',getAllUser);
authRouter.post('/signup',signUp);
authRouter.post('signin', signIn);

export default authRouter;
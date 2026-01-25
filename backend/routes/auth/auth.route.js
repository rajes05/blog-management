import express from 'express';
import { signIn, signUp } from '../../controllers/auth.controller.js';
import { validate } from '../../middlewares/validation.js';
import { signInSchema, signUpSchema } from './auth.schema.js';
const authRouter = express.Router();

authRouter.post('/signup',validate(signUpSchema),signUp);
authRouter.post('/signin',validate(signInSchema), signIn);

export default authRouter;
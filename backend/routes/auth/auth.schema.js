import {email, z} from 'zod';

export const signUpSchema = z.object({
    fullName: z.string({required_error: "FullName is required !"}).min(4, "fullName must be 4 character long !"),
    email: z.string({required_error:"email is required !"}).email("Invalid email address"),
    password: z.string({required_error:"Password is required !"}).min(6, "Password must be atlead of 6 character !"),
})

export const signInSchema = z.object({
    email: z.string({required_error:"email is required !"}).email("Invalid email address"),
    password: z.string({required_error:"Password is required !"}).min(6, "Password must be atlead of 6 character !"),
})
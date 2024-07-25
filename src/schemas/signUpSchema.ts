import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be greater than 2 characters")
    .max(20 , "Username must not be greater than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username should not contain a special character")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters long"})
})
import {z} from "zod";

export const MessageSchema = z.object({
    content: z
    .string()
    .min(10, {message:"content must be atleast 10 characters"})
    .max(300,{message:"content cannot be more than 300 characaters"})
})
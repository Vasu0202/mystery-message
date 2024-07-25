import {z} from "zod";

export const acceptMessageSchema = z.object({
   accpetmessages: z.boolean()
})
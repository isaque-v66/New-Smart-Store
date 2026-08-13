import z from "zod";



export const LoginDTOSchema = z.object({
    email: z.string(),
    password: z.string()
})


export type LoginDTOType = z.infer<typeof LoginDTOSchema>
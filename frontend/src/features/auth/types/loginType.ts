import z from "zod";


export const LoginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string()
})



export type LoginFormType = z.infer<typeof LoginSchema>
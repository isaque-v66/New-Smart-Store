import z from "zod";


export const RegisterDTOSchema = z.object({
    name: z.string(),
    email: z.email("Email inválido"),
    password: z.string()
})



export type RegisterDTO = z.infer<typeof RegisterDTOSchema>
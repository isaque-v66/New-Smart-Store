import { z } from "zod"

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirme a senha"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  )

export type RegisterFormType = z.infer<typeof RegisterSchema>
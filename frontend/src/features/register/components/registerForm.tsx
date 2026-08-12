"use client"

import { useState } from "react"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterFormType, RegisterSchema } from "../types/registerTypes"
import toast from "react-hot-toast"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {register, handleSubmit, setError, formState: {errors}} = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema)
  })




  async function sendRegister(data: RegisterFormType) {
      const {name, email, password} = data

      try {
        const response = await fetch('', {
          method: "POST",
          headers: {"Content-type":"application/json"},
          body: JSON.stringify({
            name, email, password
          })
        })

        const result = await response.json()
  
        if(!response.ok) {
          if(response.status === 409) {
             setError("email", {
              type: "server",
              message: "Este e-mail já está cadastrado"
             })
            }
          toast.error(result.message || "Não foi possível criar a conta")
          return
        }


        toast.success("Conta criada com sucesso!")


      } catch(err) {
        console.error(err)

        toast.error("Não foi possível se comunicar com o banco de dados. Tente novamente")

      }
      

      
     
  }




  return (
    <form  onSubmit={handleSubmit(
    sendRegister,
    (errors) => {
      console.log("ERROS DO RHF:", errors)
    }
  )} className="flex flex-col gap-5">
      {/* Nome */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-[#1c1917]"
        >
          Nome completo
        </label>

        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Seu nome completo"
          className="
            h-11 w-full rounded-lg
            border border-black/10
            bg-white
            px-3.5
            text-sm text-[#1c1917]
            outline-none
            transition
            placeholder:text-black/35
            focus:border-[#1c1917]/40
            focus:ring-2
            focus:ring-[#1c1917]/5
          "
        />

        {errors.name && (
          <p className="text-red-500 font-medium text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-[#1c1917]"
        >
          E-mail
        </label>

        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          className="
            h-11 w-full rounded-lg
            border border-black/10
            bg-white
            px-3.5
            text-sm text-[#1c1917]
            outline-none
            transition
            placeholder:text-black/35
            focus:border-[#1c1917]/40
            focus:ring-2
            focus:ring-[#1c1917]/5
          "
        />

        
        {errors.email && (
          <p className="text-red-500 font-medium text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-[#1c1917]"
        >
          Senha
        </label>

        <div className="relative">
          <input
            {...register("password")}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha"
            autoComplete="new-password"
            className="
              h-11 w-full rounded-lg
              border border-black/10
              bg-white
              px-3.5 pr-11
              text-sm text-[#1c1917]
              outline-none
              transition
              placeholder:text-black/35
              focus:border-[#1c1917]/40
              focus:ring-2
              focus:ring-[#1c1917]/5
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-black/40
              transition
              hover:text-[#1c1917]
            "
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        
        {errors.password && (
          <p className="text-red-500 font-medium text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar senha */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-[#1c1917]"
        >
          Confirmar senha
        </label>

        <div className="relative">
          <input
            {...register("confirmPassword")}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Digite a senha novamente"
            autoComplete="new-password"
            className="
              h-11 w-full rounded-lg
              border border-black/10
              bg-white
              px-3.5 pr-11
              text-sm text-[#1c1917]
              outline-none
              transition
              placeholder:text-black/35
              focus:border-[#1c1917]/40
              focus:ring-2
              focus:ring-[#1c1917]/5
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-black/40
              transition
              hover:text-[#1c1917]
            "
            aria-label={
              showConfirmPassword
                ? "Ocultar confirmação de senha"
                : "Mostrar confirmação de senha"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        
        {errors.confirmPassword && (
          <p className="text-red-500 font-medium text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="
          mt-1
          flex h-11 w-full
          items-center justify-center gap-2
          rounded-lg
          bg-[#1c1917]
          px-4
          text-sm font-medium
          text-white
          transition
          hover:bg-[#292524]
          active:scale-[0.99]
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <UserPlus className="size-4" />
        Criar conta
      </button>
    </form>
  )
}
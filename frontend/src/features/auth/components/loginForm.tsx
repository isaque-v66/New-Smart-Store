"use client"


import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormType, LoginSchema } from "../types/loginType"
import toast from "react-hot-toast"
import { useAuth } from "../context/auth-context"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: zodResolver(LoginSchema)
  })
  const {refreshUser} = useAuth()





  async function sendLoginForm(data: LoginFormType) {
      const {email, password} = data

      try {

        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {"Content-type":"application/json"},
          credentials: "include",
          body: JSON.stringify({email, password})
        })

        const res = await response.json()

        if(!response.ok) {
          toast.error(res.message || "Erro no servidor")
          return
        }

        await refreshUser()
        router.replace("/dashboard")

      } catch(err) {
        console.error(err)
        
        toast.error("Erro ao se comunicar com o servidor")

      }
    
  }




  return (
    <form onSubmit={handleSubmit(sendLoginForm)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-[#1c1917]">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#1c1917] focus-visible:ring-3 focus-visible:ring-[#1c1917]/10"
        />
         {errors && (
              <p className="text-sm text-red-600">{errors.email?.message}</p>
            )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-[#1c1917]">
            Senha
          </label>
          <button type="button" className="text-xs text-muted-foreground hover:text-[#1c1917] hover:underline">
            Esqueceu a senha?
          </button>
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#1c1917] focus-visible:ring-3 focus-visible:ring-[#1c1917]/10"
          />
            {errors && (
              <p className="text-sm text-red-600">{errors.password?.message}</p>
            )}

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-[#1c1917]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-[#1c1917] text-sm font-medium text-white transition-colors hover:bg-[#1c1917]/90"
      >
        {isSubmitting ? (<>
             <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Entrando...
        </>):(<>
          Entre
        </>)}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <button type="button" className="font-medium text-[#1c1917] hover:underline" onClick={() => router.replace('/register')}>
          Cria uma!
        </button>
      </p>
    </form>
  )
}

import { ShoppingBag } from "lucide-react"
import { LoginForm } from "./loginForm"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full">
      {/* Painel lateral de marca */}
      <section className="relative hidden w-1/2 flex-col justify-between bg-[#1c1917] p-12 text-white lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg border border-white/25 text-white">
            <ShoppingBag className="size-4.5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">Smart Store</span>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-balance font-serif text-[2.75rem] font-bold leading-[1.15]">
            Descubra produtos elaborados para o seu estilo de vida.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-white/60">
            Faça login para explorar nossa coleção selecionada de produtos premium, gerenciar
            seus pedidos e acessar ofertas exclusivas.
          </p>
        </div>

        <p className="text-sm text-white/40">Smart Store {new Date().getFullYear()}</p>
      </section>

      {/* Formulário */}
      <section className="flex w-full flex-col items-center justify-center bg-[#faf9f7] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg border border-foreground/25 text-foreground">
              <ShoppingBag className="size-4.5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Smart Store</span>
          </div>

          <div className="mb-8 flex flex-col gap-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1c1917]">
              Bem-vindo de volta!
            </h2>
            <p className="text-sm text-muted-foreground">
              Entre com suas credênciais para acessar sua conta.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  )
}

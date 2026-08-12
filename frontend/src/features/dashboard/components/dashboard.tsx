"use client"

import {
  Briefcase,
  ChefHat,
  Cpu,
  Home,
  Lightbulb,
  PanelLeft,
  Scissors,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  Watch,
} from "lucide-react"

const categories = [
  { label: "All Products", icon: ShoppingBag, active: true },
  { label: "Bags & Accessories", icon: Briefcase },
  { label: "Home & Living", icon: Home },
  { label: "Lighting", icon: Lightbulb },
  { label: "Kitchen", icon: ChefHat },
  { label: "Technology", icon: Cpu },
  { label: "Watches", icon: Watch },
  { label: "Textiles", icon: Scissors },
]

type Product = {
  id: string
  name: string
  description: string
  price: string
  badge?: "Novo" | "Promoção"
}

const products: Product[] = [
  { id: "1", name: "Fone Bluetooth 1", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$94.17", badge: "Novo" },
  { id: "2", name: "Camiseta Premium 2", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$67.63" },
  { id: "3", name: "Luminaria Decorativa 3", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$128.08" },
  { id: "4", name: "Tenis de Corrida 4", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$260.97" },
  { id: "5", name: "Creme Hidratante 5", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$42.90" },
  { id: "6", name: "Fone sem Fio 6", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$189.00", badge: "Promoção" },
  { id: "7", name: "Camiseta Basica 7", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$54.20" },
  { id: "8", name: "Luminaria de Mesa 8", description: "Produto de alta qualidade, ideal para o dia a dia.", price: "$97.35", badge: "Novo" },
]

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  Novo: "bg-[#e0462e] text-white",
  Promoção: "bg-[#e0462e] text-white",
}

export default function ProductsDashboard() {
  return (
    <div className="flex min-h-screen w-full bg-[#faf9f7] text-[#1c1917]">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-black/10 bg-[#faf9f7] lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-black/10 px-6">
          <div className="flex size-8 items-center justify-center rounded-lg border border-black/15 text-[#1c1917]">
            <ShoppingBag className="size-4" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight">Smart Store</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
          <span className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground">
            Categorias
          </span>
          {categories.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                item.active
                  ? "bg-black/[0.06] font-medium text-[#1c1917]"
                  : "text-[#57534e] hover:bg-black/[0.04]"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 border-t border-black/10 px-6 py-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#1c1917] text-xs font-medium text-white">
            N
          </div>
          <span className="text-xs text-muted-foreground">Smart Store 2026.</span>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-black/10 bg-[#faf9f7] px-6">
          <button className="flex size-9 items-center justify-center rounded-lg text-[#1c1917] hover:bg-black/[0.05] lg:hidden">
            <PanelLeft className="size-4.5" />
          </button>

          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg border border-black/15">
              <ShoppingBag className="size-4" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight">Smart Store</span>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="h-10 w-full rounded-lg border-none bg-black/[0.045] pr-4 pl-10 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#1c1917]/15"
            />
          </div>

          <div className="flex items-center gap-1">
            <button className="flex size-9 items-center justify-center rounded-lg text-[#1c1917] hover:bg-black/[0.05]">
              <ShoppingCart className="size-4.5" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg text-[#1c1917] hover:bg-black/[0.05]">
              <User className="size-4.5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 py-8">
          <div className="mb-8 flex flex-col gap-1">
            <h1 className="font-serif text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-sm text-muted-foreground">48 produtos encontrados</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white"
              >
                {/* Placeholder de imagem */}
                <div className="relative aspect-square w-full bg-black/[0.06]">
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-medium ${badgeStyles[product.badge]}`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#1c1917]">{product.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="text-base font-semibold text-[#1c1917]">{product.price}</span>
                    <button className="flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-2 text-xs font-medium text-[#1c1917] transition-colors hover:bg-black/[0.04]">
                      <ShoppingCart className="size-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

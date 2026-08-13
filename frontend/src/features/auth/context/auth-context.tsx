"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
  logout: ()=> Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({children,}: {children: React.ReactNode}) {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
        const response = await fetch(
          "http://localhost:3333/me",
          {
            method: "GET",
            credentials: "include",
          })

        if(!response.ok) {
          setUser(null)
          return
        }


        const data = await response.json()

        setUser(data.user)

    } catch(err) {
      console.error("Erro ao verificar autenticação: ", err)
    }
  }, [])


    const logout = useCallback(async () => {
      try {

        await fetch("http://localhost:3333/logout", {
          method: 'POST',
          credentials: "include"
        })

      } catch(err) {
        console.error("Erro ao fazer logout", err)
      } finally {
        setUser(null)
        router.push("/login")
      }

    }, [router])




 useEffect(() => {
    async function initializeAuth() {
      try {
        await refreshUser()
      } finally {
        setLoading(false)
      }
    }
  initializeAuth()
  }, [refreshUser])


   return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}



export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider"
    )
  }

  return context
}
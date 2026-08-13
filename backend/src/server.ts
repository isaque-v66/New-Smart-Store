import fastify from "fastify";
import type { RegisterDTO } from "./application/dto/registerDTO.js";
import { loginUseCase, registerUseCase } from "./presentation/connecions.js";
import cors from "@fastify/cors"
import cookie from "@fastify/cookie"
import type { LoginDTOType } from "./application/dto/loginDTO.js";
import jwt from "jsonwebtoken"
import { authenticate } from "./shared/hooks/authenticate.js";


export const app = fastify({
    logger: true
})


await app.register(cors, {
    origin: "http://localhost:3000",
    credentials: true
})

await app.register(cookie)






app.post("/register", async (request, reply) => {

    const {name, email, password} = request.body as RegisterDTO

    try {

        const response = await registerUseCase.execute({name, email, password})


        return reply.status(200).send(response)

    } catch(err) {
        console.error(err)
        return reply.status(500).send(err)
    }

})



app.post("/logout", async (request, reply) => {
  reply.clearCookie("token", {
    path: "/",
  })

  return reply.send({
    message: "Logout realizado com sucesso",
  })
})





app.post("/login", async(request, reply) => {

    const data = request.body as LoginDTOType

    try {
        const response = await loginUseCase.execute(data)

        reply.setCookie("token", response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "lax",
            path: "/",
            maxAge:60 *60
        })


        return reply.status(200).send({
            message: "Login realizado com sucesso"
        })

    } catch(err) {
        console.error(err)
        return reply

    }
})




app.get("/me", {preHandler: authenticate}, async (request, reply) => {
  const token = request.cookies.token

  if (!token) {
    return reply.status(401).send({
      message: "Não autenticado",
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    )

    return reply.send({
      user: decoded,
    })
  } catch {
    return reply.status(401).send({
      message: "Token inválido",
    })
  }
})






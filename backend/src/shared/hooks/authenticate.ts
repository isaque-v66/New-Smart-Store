import type { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"

type JwtPayload = {
  id: string
  email: string
}




export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
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
    ) as JwtPayload

    request.user = {
      id: decoded.id,
      email: decoded.email,
    }
  } catch {
    return reply.status(401).send({
      message: "Token inválido ou expirado",
    })
  }
}
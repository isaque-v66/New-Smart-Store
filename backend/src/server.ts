import fastify from "fastify";
import type { RegisterDTO } from "./application/dto/registerDTO.js";
import { registerUseCase } from "./presentation/connecions.js";
import cors from "@fastify/cors"


export const app = fastify({
    logger: true
})


await app.register(cors, {
  origin: "http://localhost:3000",
})


app.post("/register", async (request, reply) => {

    const {name, email, password} = request.body as RegisterDTO

    try {

        const response = await registerUseCase.execute({name, email, password})


        reply.status(200).send(response)

    } catch(err) {
        console.error(err)
        reply.status(500).send(err)
    }

})


const start = async () => {

    await app.listen({
        port: 3333,
        host: "0.0.0.0"
    })
}



start()
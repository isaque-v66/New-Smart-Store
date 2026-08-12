import fastify from "fastify";



export const app = fastify({
    logger: true
})



const start = async () => {

    await app.listen({
        port: 3333,
        host: "0.0.0.0"
    })
}



start()
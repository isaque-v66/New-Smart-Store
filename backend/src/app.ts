import { app } from "./server.js"

const start = async () => {

    await app.listen({
        port: 3333,
        host: "0.0.0.0"
    })
}



start()

export class ApiErrors extends Error {
     constructor(mensage: string, statusCode = 400){
        super(mensage)
     }
}
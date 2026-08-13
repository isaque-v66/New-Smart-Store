import type { RegisterRepository } from "../../domain/repository/registerRepository.js";
import { ApiErrors } from "../../shared/errors/apiErrors.js";
import type { RegisterDTO } from "../dto/registerDTO.js";
import bcrypt from "bcrypt"



export class RegisterUseCase {

    constructor(private repository: RegisterRepository){}


    async execute(data: RegisterDTO) {
        const {name, email, password} = data

        if(!name || !email || !password) {
            throw new ApiErrors("Campos não informados", 409)
        }

        try {

            const emailExists = await this.repository.findByEmail(email)

            if(emailExists) {
                throw new ApiErrors("Email já existe", 409)
            }
             

            const hashPassword = await bcrypt.hash(password, 10)

            const user = await this.repository.create({
                name: name,
                email: email,
                password: hashPassword
            })

            return {
                message: "Usuário criado com sucesso!!!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }


        } catch(err) {
            console.error(err)

            throw new ApiErrors("Erro ao realizar cadastro", 500)

        }

    }

}
import type { AuthRepository } from "../../domain/repository/registerRepository.js";
import { ApiErrors } from "../../shared/errors/apiErrors.js";
import type { LoginDTOType } from "../dto/loginDTO.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export class LoginUseCase {

    constructor(private repository: AuthRepository){}



    async execute(data: LoginDTOType) {
        const {email, password} = data

        const emailExists = await this.repository.findByEmail(email)

        if(!emailExists) {
                throw new ApiErrors("Email ou senha incorreto")
            }

        const isPasswordValid = await bcrypt.compare(password, emailExists.password)

        if(!isPasswordValid) {
                throw new ApiErrors("Email ou senha incorreto")
            }


        const token = jwt.sign({
                id: emailExists.id,
                email: emailExists.email
            },
            process.env.JWT_SECRET!, 
            {
                expiresIn: "1d"
            })

          


            return {
                token
            }
            



       

    }

}
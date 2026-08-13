import type { User } from "@prisma/client";
import type { RegisterRepository } from "../../domain/repository/registerRepository.js";
import { prisma } from "../../shared/prisma/client.js";



export class RegisterInfra implements RegisterRepository {


    create(data: { name: string; email: string; password: string; }): Promise<User> {
        return prisma.user.create({data: {
            ...data
        }})
    }


    findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}})
    }
}
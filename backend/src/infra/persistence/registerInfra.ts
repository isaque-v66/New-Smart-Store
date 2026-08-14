import type { User } from "@prisma/client";

import { prisma } from "../../shared/prisma/client.js";
import type { AuthRepository } from "../../domain/repository/registerRepository.js";



export class RegisterInfra implements AuthRepository {


    create(data: { name: string; email: string; password: string; }): Promise<User> {
        return prisma.user.create({data: {
            ...data
        }})
    }


    findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}})
    }
}
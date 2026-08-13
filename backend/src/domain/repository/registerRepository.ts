import type { User } from "@prisma/client";


export interface AuthRepository {

    create(data: {name: string, email: string, password: string}): Promise<User>

    findByEmail(email: string): Promise<User | null>



}
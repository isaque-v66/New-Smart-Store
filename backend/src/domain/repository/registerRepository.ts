import type { User } from "@prisma/client";


export interface RegisterRepository {

    create(data: {name: string, email: string, password: string}): Promise<User>

    findByEmail(email: string): Promise<User | null>



}
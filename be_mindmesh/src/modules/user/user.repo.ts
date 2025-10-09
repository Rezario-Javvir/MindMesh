import { prisma } from "../../config/prisma.js"
import type { User } from "@prisma/client"

export const find_name_user = async (username: string): Promise<User | null> => {
    return prisma.user.findFirst({
        where: { username },
        include: {
            profile: true,
            blog: true
        }
    })
}

export const find_email_user = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email },
        include: {
            profile: true,
            blog: true
        }
    })
}

export const find_all_user = async (): Promise<User[]> => {
    return prisma.user.findMany()
}
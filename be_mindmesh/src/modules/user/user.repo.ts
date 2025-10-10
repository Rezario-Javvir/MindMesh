import { prisma } from "../../config/prisma.ts"
import type { User } from "@prisma/client"

export const find_name_user = async (partialName: string) => {
    return prisma.user.findMany({
        where: {
            username: {
                contains: partialName
            }
        },
        select: {
            id: true,
            username: true,
            email: true,
            profile: true,
            blog: true
        },
        take: 10
    })
}

export const find_email_user = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        include: {
            profile: true,
            blog: true
        }
    })
}

export const find_all_user = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            profile: true,
            blog: true
        }
    })
}
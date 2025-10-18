import { prisma } from "../../config/prisma.ts"

export const user = async () => {
    return prisma.user.findMany()
}

export const profile = async () => {
    return prisma.profile.findMany()
}

export const article = async () => {
    return prisma.blog.findMany()
}

export const category = async () => {
    return prisma.category.findMany()
}

export const comment = async () => {
    return prisma.comment.findMany()
}
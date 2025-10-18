import { prisma } from "../../config/prisma.ts"

export const article_create = async (
    title: string, 
    content: string, 
    user_id: number,
    category_id: number
) => {
    return prisma.article.create({
        data: {
            title,
            content,
            user_id,
            category_id
        }
    })
}

export const all_article = async () => {
    return prisma.article.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    profile: {
                        select: {
                            id: true,
                            fullname: true,
                            bio: true,
                            avatar: true
                        }
                    }
                }
            }
        }
    })
}

export const find_article = async (partialTitle: string) => {
    return prisma.article.findMany({
        where: {
            title: {
                contains: partialTitle
            }
        }
    })
}

export const update_article = async (id: number, data: any) => {
    return prisma.article.update({
        where: { id },
        data: data
    })
}
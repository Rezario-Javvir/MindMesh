import { prisma } from "../../config/prisma.ts"

export const article_create_repo = async (
    title: string, 
    content: string,
    image: string,
    user_id: number,
    category_id: number
) => {
    return prisma.article.create({
        data: {
            title,
            content,
            image,
            user_id,
            category_id
        }
    })
}

export const all_article_repo = async () => {
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

export const find_article_repo = async (partialTitle: string) => {
    return prisma.article.findMany({
        take: 5,
        where: {
            title: {
                contains: partialTitle
            }
        }
    })
}

export const update_article_repo = async (id: number, data: any) => {
    return prisma.article.update({
        where: { id },
        data: data
    })
}
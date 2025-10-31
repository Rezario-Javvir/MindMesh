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
        omit: { created_at: true, updated_at: true },
        include: {
            user: {
                omit: { password: true },
                include: {
                    profile: true
                }
            },
            comment: {
                select: {
                    id: true,
                    text: true
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

export const article_detail_repo = async (id: number) => {
    return prisma.article.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    profile: true
                }
            },
            comment: {
                include: {
                    user: {
                        select: {
                            profile: true
                        }
                    }
                }
            }
        }
    })
}

export const update_article_repo = async (id: number, data: { title: string, content: string, image: string }) => {
    return prisma.article.update({
        where: { id },
        data: data
    })
}
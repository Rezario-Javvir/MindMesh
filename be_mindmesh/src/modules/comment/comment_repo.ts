import { prisma } from "../../config/prisma"

export const create_comment_repo = (data: { text: string, user_id: number, article_id: number }) => {
    return prisma.comment.create({
        data: data,
    })
}

export const get_comment_by_article_id_repo = (article_id: number) => {
    return prisma.comment.findMany({
        where: { article_id: article_id },
        include: {
            user: true
        }
    })
}
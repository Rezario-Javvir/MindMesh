import { prisma } from "../../config/prisma.ts"

export const check_user_repo = async () => {
    return prisma.user.findMany({
        include: {
            profile: true,
            article: true
        }
    })
}

export const check_profile_repo = async () => {
    return prisma.profile.findMany()
}

export const check_article_repo = async () => {
    return prisma.article.findMany({
        include: {
            user: {
                omit: { 
                    id: true, 
                    password: true 
                }
            },
            category: { omit: { id: true } }
        }
    })
}

export const check_category_repo = async () => {
    return prisma.category.findMany()
}

export const check_comment_repo = async () => {
    return prisma.comment.findMany()
}
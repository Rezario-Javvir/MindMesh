import { prisma } from "../../config/prisma"

export const my_profile_repo = async (user_id: number) => {
    return prisma.profile.findUnique({
        where: { user_id },
        include: {
            user: {
                include: {
                    article: true
                }
            },
        }
    })
}

export const find_id_profile_repo = async (id: number) => {
    return prisma.profile.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    email: true,
                    article: true
                }
            }
        }
    })
}

export const edit_user_profile_repo = async (user_id: number, data: { username?: string, bio?: string, avatar?: string }) => {
    return prisma.profile.update({
        where: { user_id: user_id },
        data: data
    })
}
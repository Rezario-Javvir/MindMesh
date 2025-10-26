import { prisma } from "../../config/prisma.ts"

export const my_profile_repo = async () => {
    return prisma.profile.findFirst({
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
        omit: {
            user_id: true
        },
        include: {
            user: {
                select: {
                    article: true
                }
            }
        }
    })
}

export const edit_user_profile_repo = async (id: number, data: { fullname?: string, bio?: string, avatar?: string }) => {
    return prisma.profile.update({
        where: { id },
        data: data
    })
}
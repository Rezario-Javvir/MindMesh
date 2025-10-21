import { prisma } from "../../config/prisma.ts"

export const find_id_profile_repo = async (id: number) => {
    return prisma.profile.findUnique({
        where: { id },
        select: {
            id: true,
            fullname: true,
            bio: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    blog: true
                }
            },
        }
    })
}

export const edit_user_profile_repo = async (id: number, data: any) => {
    return prisma.profile.update({
        where: { id },
        data: data
    })
}
import { prisma } from "../../config/prisma.ts"

// export const find_name_user = async (partialName: string) => {
//     return prisma.user.findMany({
//         where: {
//             username: {
//                 contains: partialName
//             }
//         },
//         select: {
//             id: true,
//             username: true,
//             email: true,
//             profile: true,
//             blog: true
//         },
//         take: 10
//     })
// }

export const find_email_user_repo = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        include: {
            profile: true,
            article: true
        }
    })
}

export const find_all_user_repo = async () => {
    return prisma.user.findMany({
        include: {
            profile: true,
            article: true
        }
    })
}

export const find_user_id_repo = async (id: number) => {
    return prisma.user.findUnique({
        where: { id }
    })
}

export const update_password_repo = async (user_id: number, pass_hash: string) => {
    return prisma.user.update({
        where: { id: user_id },
        data: { password: pass_hash }
    })
}
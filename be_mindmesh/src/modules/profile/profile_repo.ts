import { prisma } from "../../config/prisma.ts"

export const find_id_profile_repo = async (id: number) => {
    return prisma.profile.findUnique({
        where: { id },
        omit: {
            user_id: true
        },
        include: {
            user: {
                omit: { password: true },
                include: {
                    article: {
                        omit: {
                            created_at: true,
                            updated_at: true
                        }
                    }
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
import * as ProfileRepo from "./profile_repo.ts"

export const my_profile_service = async (user_id: number) => {
    return await ProfileRepo.my_profile_repo(user_id)
}

export const find_profile = async (id: number) => {
    const profile = await ProfileRepo.find_id_profile_repo(id)

    if (!profile) {
        throw new Error("Profile not found")
    }

    return profile
}

export const edit_user_profile = async (id: number, data: { username?: string, bio?: string, avatar?: string }) => {
    const profile = await ProfileRepo.edit_user_profile_repo(id, data)

    if (!profile) {
        throw new Error("Profile not found")
    }

    return profile
}
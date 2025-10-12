import * as ProfileRepo from "./profile.repo.ts"

export const find_profile = async (id: number) => {
    const profile = await ProfileRepo.find_id_profile(id)

    if (!profile) {
        throw new Error("Profile not found")
    }

    return profile
}

export const edit_user_profile = async (id: number, data: any) => {
    const profile = await ProfileRepo.edit_user_profile(id, data)

    if (!profile) {
        throw new Error("Profile not found")
    }

    return profile
}
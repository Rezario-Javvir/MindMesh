import * as CheckRepo from "./check_db.repo.ts"

export const check_user_service = async () => {
    return await CheckRepo.check_user_repo()
}

export const check_profile_service = async () => {
    return await CheckRepo.check_profile_repo()
}

export const check_article_service = async () => {
    return await CheckRepo.check_article_repo()
}

export const check_category_service = async () => {
    return await CheckRepo.check_category_repo()
}

export const check_comment_service = async () => {
    return await CheckRepo.check_comment_repo()
}
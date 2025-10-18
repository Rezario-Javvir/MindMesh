import * as CheckService from "./check_db.repo.ts"

export const check_user_service = async () => {
    return await CheckService.user()
}

export const check_profile_service = async () => {
    return await CheckService.profile()
}

export const check_blog_service = async () => {
    return await CheckService.article()
}

export const check_category_service = async () => {
    return await CheckService.category()
}

export const check_comment_service = async () => {
    return await CheckService.comment()
}
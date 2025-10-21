import * as CategoryRepo from "./category_repo.ts"

export const category_create_service = async () => {
    return await CategoryRepo.category_create_repo()
}

export const get_categories_service = async () => {
    return await CategoryRepo.get_categories_repo()
}
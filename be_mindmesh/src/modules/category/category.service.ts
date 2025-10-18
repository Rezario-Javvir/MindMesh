import * as CategoryRepo from "./category.repo.ts"

export const category_create_service = async () => {
    return await CategoryRepo.category_create()
}

export const get_categories_service = async () => {
    return await CategoryRepo.get_categories()
}
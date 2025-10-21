import { ErrorOutput } from '../../util/Output.ts'
import * as ArticleRepo from './article_repo.ts'

export const create_article_service = async (
    title: string, 
    content: string,
    image: string,
    user_id: number,
    category_id: number
) => {
    if(!title || !content || !user_id || !category_id) {
        throw new ErrorOutput("Missing required fields", 400)
    }
    
    const blog = await ArticleRepo.article_create_repo(title, content, image, user_id, category_id)
    return blog
}

export const find_all_article_service = async () => {
    const blog = await ArticleRepo.all_article_repo()
    return blog
}

export const search_article_service = async (partial_title: string) => {
    const blog = await ArticleRepo.find_article_repo(partial_title)

    if(!blog) {
        throw new ErrorOutput("No blogs found matching the search query.", 404)
    }
    return blog
}

export const edit_article_service = async (id: number, data: any) => {
    const blog = await ArticleRepo.update_article_repo(id, data)
    if(!blog) {
        throw new ErrorOutput("Blog not found", 404)
    }
    return blog
}
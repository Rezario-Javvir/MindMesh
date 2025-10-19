import { ErrorOutput } from '../../util/Output.ts'
import * as ArticleRepo from './article.repo.ts'

export const create_article = async (
    title: string, 
    content: string,
    image: string,
    user_id: number,
    category_id: number
) => {
    if(!title || !content || !user_id || !category_id) {
        throw new ErrorOutput("Missing required fields", 400)
    }
    
    const blog = await ArticleRepo.article_create(title, content, image, user_id, category_id)
    return blog
}

export const find_all_article = async () => {
    const blog = await ArticleRepo.all_article()
    return blog
}

export const search_article = async (partial_title: string) => {
    const blog = await ArticleRepo.find_article(partial_title)

    if(!blog) {
        throw new ErrorOutput("No blogs found matching the search query.", 404)
    }
    return blog
}

export const edit_article = async (id: number, data: any) => {
    const blog = await ArticleRepo.update_article(id, data)
    if(!blog) {
        throw new ErrorOutput("Blog not found", 404)
    }
    return blog
}
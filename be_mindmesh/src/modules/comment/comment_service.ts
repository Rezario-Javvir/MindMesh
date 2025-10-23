import * as CommentRepo from "./comment_repo.ts"
import { ErrorOutput } from "../../util/Output.ts"

export const create_comment_service = async (data: { text: string, user_id: number, article_id: number }) => {
    const comment = await CommentRepo.create_comment_repo(data)
    if(!comment) {
        throw new ErrorOutput("Missing field required", 400)
    }
    return comment
}

export const get_comment_by_article_id_service = async (blog_id: number) => {
    return await CommentRepo.get_comment_by_article_id_repo(blog_id)
}
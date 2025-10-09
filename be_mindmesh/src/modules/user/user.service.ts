import * as UserRepo from './user.repo.js'
import { ErrorOutput } from '../../util/output.js'

export const find_name = async (username: string): Promise<any> => {
    const name_user = await UserRepo.find_name_user(username)

    if(!name_user) {
        throw new ErrorOutput('User not found', 404)
    }
    return name_user
}
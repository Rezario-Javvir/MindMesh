import * as UserRepo from './user.repo.ts'

// export const find_name = async (partial_name: string): Promise<any> => {
//     const name_user = await UserRepo.find_name_user(partial_name)

//     if(!name_user) {
//         throw new ErrorOutput("No users found matching the search query.", 404)
//     }
    
//     return name_user
// }

export const find_all_user = async (): Promise<any> => {
    const user = await UserRepo.find_all_user()
    return user
}
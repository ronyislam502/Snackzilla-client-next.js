import { TUserDetail } from "./user"


export type TBlog = {
    _id: string
    user: TUserDetail
    title: string
    description: string
    image: string
    tags: string[]
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}
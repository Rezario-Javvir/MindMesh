import { prisma } from "../../config/prisma"

export const category_create_repo = async () => {
    return prisma.category.createMany({
        data: [
            { category_name: "Technology" },
            { category_name: "Politic" },
            { category_name: "Education" },
            { category_name: "Health" },
            { category_name: "Military" },
            { category_name: "Finance" },
            { category_name: "Religion" },
            { category_name: "history" },
            { category_name: "Self-Improvement" },
            { category_name: "Travel" }
        ]
    })
}

export const get_categories_repo = async () => {
    return prisma.category.findMany()
}
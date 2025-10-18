import { prisma } from "../../config/prisma.ts"

export const category_create = async () => {
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
            { category_name: "Other" }
            { category_name: "Tech" },
            { category_name: "Self-Improvement" }
        ]
    })
}

export const get_categories = async () => {
    return prisma.category.findMany()
}
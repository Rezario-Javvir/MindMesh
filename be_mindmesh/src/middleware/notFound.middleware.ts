import type { Request, Response, NextFunction } from "express"
import { ErrorOutput } from "../util/Output.ts"

export const notFound = async (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorOutput(`Endpoint not found: ${req.originalUrl}`, 404)

    next(error)
}
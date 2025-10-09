import type { Request, Response, NextFunction } from "express"
import { ErrorOutput } from "../util/output.js"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)

    let statusCode = 500
    let message = "Something went wrong"

    if (error instanceof ErrorOutput) {
        statusCode = error.statusCode
        message = error.message
    }

    res.status(statusCode).json({
        status: 'error',
        message: message
    })
}
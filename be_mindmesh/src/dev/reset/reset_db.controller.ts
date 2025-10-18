import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../../config/prisma.ts'
import chalk from 'chalk'

export const reset_db = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.yellowBright('Resetting database...'))

    const tablesToTruncate = [
        'Comment',
        'Article',
        'Profile',
        'User',
        'category'
    ]

    try {
        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`

        for (const tableNames of tablesToTruncate) {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tableNames}`)
        }

        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`
        console.log(chalk.greenBright('Database reset successful and clean.'))
        res.status(200).json({
            status: 'success',
            message: 'Database tables have been successfully truncated and cleaned.'
        });
    } 
    catch (error) {
        console.error(chalk.red('Database reset failed:'), error)
        await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`
        next(error)
    }
}
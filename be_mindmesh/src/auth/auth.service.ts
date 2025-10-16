import * as bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import * as UserRepo from "../modules/user/user.repo.ts"
import { ErrorOutput } from '../util/Output.ts'
import { prisma } from '../config/prisma.ts'
import nodemailer from "nodemailer"
import chalk from 'chalk'

export const register = async (username: string, email: string, raw_password: string) => {
    const exist_user = await UserRepo.find_email_user(email)
    if(exist_user) {
        throw new ErrorOutput("Email already exists", 409)
    }

    const salt = 15
    const hashed_pass = await bcrypt.hash(raw_password, salt)

    const result = await prisma.user.create({
        data: {
            username,
            email,
            password: hashed_pass,
            profile: {
                create: {
                    fullname: null,
                    bio: "Hello, I'm new in MindMesh",
                    avatar: null
                }
            }
        },
        include: {
            profile: true
        }
    })

    const { password, ...userWithoutPass } = result
    return {
        user: userWithoutPass
    }
}

export const login = async (email: string, raw_password: string) => {
    const user = await UserRepo.find_email_user(email)
    if(!user) {
        throw new ErrorOutput("Account not found", 404)
    }

    const JWT_SECRET = process.env.JWT_SECRET_TOKEN

    const match_pass = await bcrypt.compare(raw_password, user.password)
    if(!match_pass) {
        throw new ErrorOutput("Invalid credentials", 401)
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, { expiresIn: '2d' })

    const { password, ...userWithoutPass } = user
    return { user: userWithoutPass, token: token }
}

export const forgot_password = async (email: string) => {
    const user = await UserRepo.find_email_user(email)
    if(!user) {
        console.log(chalk.greenBright("Forgot password request processed for non-existent user."))
        return
    }

    const JWT_SECRET = process.env.JWT_SECRET_TOKEN
    const token = jwt.sign({ id: user.id }, JWT_SECRET!, { expiresIn: '15m' })
    console.log(chalk.yellowBright.bold("DEBUG TOKEN:"), chalk.cyan(token))

    const reset_link = ` http://localhost:3000/reset-password?token=${token}`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    await transporter.sendMail({
        from: `"${process.env.APP_NAME || 'MindMesh Support'}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `<p>Click this link to reset your password: <a href="${reset_link}">${reset_link}</a></p>`
    })
    console.log(chalk.greenBright("Password reset email sent successfully."))
}

export const reset_password = async (token: string, new_password: string) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET_TOKEN
        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number }
        const user_id = decoded.id

        const user = await UserRepo.find_user_id(user_id)
        if(!user) {
            throw new ErrorOutput("Invalid user associated with token.", 404)
        }

        const salt = 15
        const new_pass = await bcrypt.hash(new_password, salt)

        await UserRepo.update_password(user_id, new_pass)

        return { message: "Password reset successful"}
    } 
    catch (error) {
        throw new ErrorOutput("Invalid or expired token", 400)
    }
}
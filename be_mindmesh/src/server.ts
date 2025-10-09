import app from './app.js'
import chalk from 'chalk'
import "dotenv/config"

const PORT = 3000

const server = app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is running on http://localhost:${PORT}`))
})

process.on('SIGINT', async () => {
    console.log(chalk.yellowBright('Shutting down server...'))
    server.close(() => {
       console.log(chalk.greenBright('Server gracefully terminated.'))
       process.exit(0)
    })
})
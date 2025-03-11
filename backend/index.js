import express from 'express'
import authRoutes from './src/routes/auth.routes.js'
import dotenv from 'dotenv'
import messageRoute from './src/routes/message.routes.js'
import { connectDB } from './src/db/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { app, server } from './src/db/socket.js'

dotenv.config()


const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser())
app.use(express.json())
connectDB()


app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoute)

if (process.env.MODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
}

server.listen(PORT, () => {
    console.log('server is running on port', PORT);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })
}
)


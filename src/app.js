import express from 'express'
import booksRoutes from './routes/books.routes.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', booksRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app
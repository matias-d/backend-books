import { Router } from "express";
import booksController from "../controllers/books.controllers.js";

const router = Router()

router
.get('/books',booksController.getBooks)

.get('/books/:id', booksController.getBookById)

.post('/books',booksController.createBooks)

.delete('/books/:id', booksController.deleteBooks)

.patch('/books/:id', booksController.updateBooks)

export default router
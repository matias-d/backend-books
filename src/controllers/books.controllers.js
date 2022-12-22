import { pool } from "../db.js"

const getBooks =  async (req, res) => {
    const page = Number(req.query.page) || 1
    const queryPage = (page - 1) * 3
    try {

        const [rows] = await pool.query('SELECT * FROM books LIMIT ? , 3', [queryPage])
        res.send(rows)
    }catch (error) {
        res.status(500).json({
            message : 'Something goes wrong'
          })
    }
}

const getBookById = async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id])
        if(rows.length === 0){
            res.status(404).json({
                message: 'Book not found'
            })
        }
        res.send(rows[0])
    } catch (error) {
        res.status(500).json({
            message : 'Something goes wrong'
          })
    }
}


const createBooks = async(req, res) => {
    const {title, desc,price, cover} = req.body
    try {
        if(!title || !desc || !price){
            res.status(400).json({
                message: 'Title or description or price not should be null'
            })
        }
        const [rows] = await pool.query('INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?, ?, ? , ?)', [title, desc,price, cover])
        res.send({
            id: rows.insertId,
            title,
            desc,
            price,
            cover
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something goes wrong'
          })
    }
}

const updateBooks = async(req, res) =>{
    const {title, desc, price, cover} = req.body
    const {id} = req.params
    try {
        const [response] = await pool.query('UPDATE books SET title = IFNULL(?, title), `desc` = IFNULL(?, `desc`), price = IFNULL(?, price), cover = IFNULL(?, cover) WHERE id = ?', [title, desc, price, cover, id])
        if(response.affectedRows <= 0){
            res.status(404).json({
                message: 'Book not found'
            })
        }
        const [rows] = await pool.query('SELECT * from books WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({
            message : 'Something goes wrong'
          })
          console.log(error)
    }
}

const deleteBooks = async(req, res) => {
    const { id } = req.params
    try {
        const [response] = await pool.query('DELETE FROM books WHERE id = ?', [id]) 
        if(response.affectedRows <= 0){
            res.status(404).json({
                message : 'book not found'
            })
        }
        res.status(201).json({
            message : 'book deleted successfully'
        })        
    } catch (error) {
        res.status(500).json({
            message : 'Something goes wrong'
          })
    }
}

const booksController = {
    getBooks,
    createBooks,
    deleteBooks,
    updateBooks,
    getBookById
}

export default booksController
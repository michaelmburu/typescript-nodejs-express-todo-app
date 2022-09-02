import express, {Request, Response, NextFunction} from 'express'
import todoRoutes from './routes/todos' //Import all todoRoutes
import {json} from 'body-parser'
import { createTodo, deleteTodo, getTodos, updateTodo } from './controller/todos'

const app = express()

//Parse all body in request & extract all json data to populate req
app.use(json())

// Add todos routes middleware
app.post('/todos', createTodo)
app.get('/todos', getTodos)
app.put('/todos/:id', updateTodo)
app.delete('/todos', deleteTodo)

//Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //Capture error
    res.status(500).json({message: err.message})
})

app.listen(3000)
console.log('listening....')
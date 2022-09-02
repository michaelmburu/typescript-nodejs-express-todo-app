import {RequestHandler, response} from 'express' //Alternative to importing individual Request, Response types

//Import model
import  { Todo } from '../models/todo'

const TODOS: Todo[] = []

//Create Todo
export const createTodo: RequestHandler = (req, res, next) => {
    // Get text from body
    const text = (req.body as {text: string}).text;
    
    //Create new todo
    const newTodo = new Todo(Math.random().toString(), text)

    //Push todo to Array
    TODOS.push(newTodo)

    //send sucessful response
    res.status(201).json({message: `Created the todo`, createTodo: newTodo})
}

// Get Todo
export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS})
}

// Update Todo
export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    // If we don't find a todo
    if(todoIndex < 0){
        throw new Error('Could not find todo!')
    }

    //Update TODOs
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

    res.status(201).json(({message: 'Updated!', updateTodo: TODOS[todoIndex]}))
}

// Delete toDo
export const deleteTodo: RequestHandler = (req, res, next) => {

    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    // If we don't find a todo
    if(todoIndex < 0){
        throw new Error('Could not find todo!')
    }

    TODOS.splice(todoIndex, 1)

    res.json({message: 'Todo deleted'})
}

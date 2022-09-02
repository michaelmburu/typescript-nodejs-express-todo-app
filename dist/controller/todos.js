"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
//Import model
const todo_1 = require("../models/todo");
const TODOS = [];
//Create Todo
const createTodo = (req, res, next) => {
    // Get text from body
    const text = req.body.text;
    //Create new todo
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    //Push todo to Array
    TODOS.push(newTodo);
    //send sucessful response
    res.status(201).json({ message: `Created the todo`, createTodo: newTodo });
};
exports.createTodo = createTodo;
// Get Todo
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
// Update Todo
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    // If we don't find a todo
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    //Update TODOs
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.status(201).json(({ message: 'Updated!', updateTodo: TODOS[todoIndex] }));
};
exports.updateTodo = updateTodo;
// Delete toDo
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    // If we don't find a todo
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
};
exports.deleteTodo = deleteTodo;

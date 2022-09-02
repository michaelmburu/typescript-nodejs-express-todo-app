"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const todos_1 = require("./controller/todos");
const app = (0, express_1.default)();
//Parse all body in request & extract all json data to populate req
app.use((0, body_parser_1.json)());
// Add todos routes middleware
app.post('/todos', todos_1.createTodo);
app.get('/todos', todos_1.getTodos);
app.put('/todos/:id', todos_1.updateTodo);
app.delete('/todos', todos_1.deleteTodo);
//Error handling middleware
app.use((err, req, res, next) => {
    //Capture error
    res.status(500).json({ message: err.message });
});
app.listen(3000);
console.log('listening....');

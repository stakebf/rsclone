const uuid = require('uuid');
const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema(
    {
        title: String,
        isComplete: {
            type: Boolean,
            default: false
        },
        _id: {
            type: String,
            default: uuid
        },
        todosId: String
    },
    { versionKey: false }
);

todoItemSchema.statics.toResponse = todoItem => {
    const { _id, title, isComplete } = todoItem;
    return { _id, title, isComplete };
};


const TodoItem = mongoose.model('TodoItem', todoItemSchema);

module.exports = TodoItem;

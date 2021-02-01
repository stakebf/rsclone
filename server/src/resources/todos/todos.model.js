const uuid = require('uuid');
const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: 'Check list'
        },
        taskId: String,
        todo: Array,
        _id: {
            type: String,
            default: uuid
        }
    },
    { versionKey: false }
);

todosSchema.statics.toResponse = todos => {
    const { _id, title, taskId, todo } = todos;
    return { _id, title, taskId, todo };
};

todosSchema.statics.fromRequest = (taskId, requestData) => {
    const todos = new Todos({
        ...requestData,
        taskId
    });
    return todos;
};

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;

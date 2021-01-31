const uuid = require('uuid');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        userName: String,
        userId: String,
        date: String,
        message: String,
        taskId: String,
        _id: {
            type: String,
            default: uuid
        }
    },
    { versionKey: false }
);

commentSchema.statics.toResponse = todos => {
    const { _id, userName, date, message, taskId, userId } = todos;
    return { _id, userName, date, message, taskId, userId };
};

// commentSchema.statics.fromRequest = (taskId, requestData) => {
//     const todos = new Todos({
//         ...requestData,
//         taskId
//     });
//     return todos;
// };

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

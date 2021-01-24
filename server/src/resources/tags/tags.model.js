const uuid = require('uuid');
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        taskId: String,
        color: String,
        _id: {
            type: String,
            default: uuid
        }
    },
    { versionKey: false }
);

tagSchema.statics.toResponse = tags => {
    const { _id, color, taskId } = tags;
    return { _id, color, taskId };
};

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

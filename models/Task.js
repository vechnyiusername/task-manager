const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subtasks: [SubTaskSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.index({ user: 1, completed: 1, createdAt: -1 }); // Составной индекс

module.exports = mongoose.model('Task', TaskSchema);
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
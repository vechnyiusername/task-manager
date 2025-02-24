const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            user: req.user.id
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: req.body },
            { new: true }
        );
        
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Массовое обновление задач
exports.bulkUpdateTasks = async (req, res) => {
    try {
        const { ids, updates } = req.body;
        const result = await Task.updateMany(
            { _id: { $in: ids }, user: req.user.id },
            { $set: updates }
        );
        res.json({ msg: `${result.nModified} tasks updated` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Массовое удаление задач
exports.bulkDeleteTasks = async (req, res) => {
    try {
        const { ids } = req.body;
        const result = await Task.deleteMany(
            { _id: { $in: ids }, user: req.user.id }
        );
        res.json({ msg: `${result.deletedCount} tasks deleted` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Статистика задач
exports.getTaskStats = async (req, res) => {
    try {
        const stats = await Task.aggregate([
            { $match: { user: req.user.id } },
            { $group: { 
                _id: '$completed', 
                count: { $sum: 1 } 
            }}
        ]);
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
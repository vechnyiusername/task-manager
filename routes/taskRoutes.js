const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask,
    bulkUpdateTasks,
    bulkDeleteTasks,
    getTaskStats
} = require('../controllers/taskController');

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.put('/bulk-update', verifyToken, bulkUpdateTasks);
router.delete('/bulk-delete', verifyToken, bulkDeleteTasks);
router.get('/stats', verifyToken, getTaskStats);

module.exports = router;
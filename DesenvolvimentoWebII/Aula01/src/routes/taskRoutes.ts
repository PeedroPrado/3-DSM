import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.get('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export const taskRoutes = router;
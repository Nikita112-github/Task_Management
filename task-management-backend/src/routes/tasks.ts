import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from '../controllers/taskController';

const router = Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/toggle', toggleTaskStatus);

export default router;
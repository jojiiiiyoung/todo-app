import { Router } from 'express';
import * as TodoController from './controllers/todo';

const router = Router();

router.get('/todos', TodoController.allTodos);
router.get('/todos/:id', TodoController.getTodo);
router.post('/todos', TodoController.addTodo);
router.patch('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;

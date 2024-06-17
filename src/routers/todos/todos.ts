import express from 'express';
import todosController from '../../controllers/todos/todos';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get('/', authenticationMiddleware, todosController.getAllTodos);
router.post('/', authenticationMiddleware, todosController.addTodo);
router.get('/:todoId', authenticationMiddleware, todosController.getTodoById);
router.patch('/:todoId', authenticationMiddleware, todosController.updateTodo);
router.delete('/:todoId', authenticationMiddleware, todosController.deleteTodo);
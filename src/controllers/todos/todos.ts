import { Request, Response, NextFunction } from 'express';
import { throwError } from '../../errors/errorCreator';
import todosService from './../../services/todos/todos';
import { InsertTodo } from '../../db/schema/todos';


const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.userRole !== 'admin') {
        throwError(403, 'Access forbidden');
      }
  
      const todos = await todosService.getAllTodos();
  
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  };

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTodo: InsertTodo = {title: req.body.title, ownerId: req.userId, done: false}
    const createdTodo = await todosService.addTodo(newTodo);
    res.status(201).json(createdTodo);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await todosService.getTodoById(parseInt(req.params.todoId));

    if (!todo) {
      throwError(404, "Ressource doesn't exists");
    }

    if (req.userRole !== 'admin' && todo?.ownerId !== req.userId) {
        throwError(403, 'Access forbidden');
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await todosService.getTodoById(parseInt(req.params.todoId))

    if (!todo) {
      throwError(404, "Ressource doesn't exists");
    }

    if (req.userRole !== 'admin' && todo?.ownerId !== req.userId) {
        throwError(403, 'Access forbidden');
    }

    const updatedTodo = await todosService.updateTodo(
      parseInt(req.params.todoId),
      req.body,
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await todosService.getTodoById(parseInt(req.params.todoId))

    if (!todo) {
      throwError(404, "Ressource doesn't exists");
    }

    if (req.userRole !== 'admin' && todo?.ownerId !== req.userId) {
        throwError(403, 'Access forbidden');
    }

    const deletedTodo = await todosService.deleteTodo(
      parseInt(req.params.todoId),
    );

    res.status(200).json(deletedTodo);
  } catch (error) {
    next(error);
  }
};

const getTodosByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.userRole !== 'admin' && parseInt(req.params.userId) !== req.userId) {
        throwError(403, 'Access forbidden');
      }
  
      const todos = await todosService.getTodosByUserId(parseInt(req.params.userId));
  
      if (!todos) {
        throwError(404, "Ressource doesn't exists");
      }
  
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  };

export default {
    getAllTodos,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
    getTodosByUserId
}
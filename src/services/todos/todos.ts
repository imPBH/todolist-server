import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertTodo, UpdateTodo, todos } from "../../db/schema/todos";
import { throwError } from "../../errors/errorCreator";

const getAllTodos = async () => {
    const result = await db.query.todos.findMany({
      columns: {
        id: true,
        title: true,
        ownerId: true,
        done: true,
      },
    });
  
    return result;
  };

  const addTodo = async (newTodo: InsertTodo) => {
    const result = await db
    .insert(todos)
    .values({ title: newTodo.title, ownerId: newTodo.ownerId, done: newTodo.done })
    .returning();

  return result[0];
  };

const getTodoById = async (todoId: number) => {
  const result = await db.query.todos.findFirst({
    columns: {
      id: true,
      title: true,
      ownerId: true,
      done: true,
    },
    where: eq(todos.id, todoId),
  });

  return result;
};

const getTodosByUserId = async (userId: number) => {
    const result = await db.query.todos.findMany({
      columns: {
        id: true,
        title: true,
        ownerId: true,
        done: true,
      },
      where: eq(todos.ownerId, userId),
    });
  
    return result;
};

const updateTodo = async (todoId: number, newData: UpdateTodo) => {
  if (Object.keys(newData).length === 0) {
    throwError(400, 'Invalid fields');
  }
  const result = await db
    .update(todos)
    .set(newData)
    .where(eq(todos.id, todoId))
    .returning({
      id: todos.id,
      title: todos.title,
      ownerId: todos.ownerId,
      done: todos.done,
    });

  return result[0];
};

const deleteTodo = async (todoId: number) => {
    const result = await db.delete(todos).where(eq(todos.id, todoId)).returning({
      id: todos.id,
      title: todos.title,
      ownerId: todos.ownerId,
      done: todos.done,
    });
    return result[0];
};

export default {
    getAllTodos,
    addTodo,
    getTodoById,
    getTodosByUserId,
    updateTodo,
    deleteTodo
}
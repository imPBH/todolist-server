import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users, usersRelations } from './schema/users';
import { todos, todosRelations } from './schema/todos';

const sqlite = new Database('./database.db');
export const db = drizzle(sqlite, {
  schema: {
    users,
    usersRelations,
    todos,
    todosRelations
  },
});

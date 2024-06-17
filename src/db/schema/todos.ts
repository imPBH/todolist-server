import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
  done: integer('done', { mode: 'boolean' }).notNull(),
});

export type Todo = typeof todos.$inferSelect;
export type InsertTodo = typeof todos.$inferInsert;
export type UpdateTodo = {
  title?: string;
  done?: boolean;
};

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users),
}));

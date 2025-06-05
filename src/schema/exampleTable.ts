import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
export const exampleTable = sqliteTable('example_table', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

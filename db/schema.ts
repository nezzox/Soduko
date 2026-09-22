import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const rounds = sqliteTable("rounds", {id:text("id").primaryKey(), mode:text("mode").notNull(), puzzle:text("puzzle").notNull(), solution:text("solution").notNull(), started:integer("started").notNull(), finished:integer("finished"), name:text("name"), elapsed:integer("elapsed")});

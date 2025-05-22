import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  pageId: text("page_id").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  icon: text("icon").default("📄"),
  published: boolean("published").default(true),
  order: integer("order").default(0),
});

export const insertPageSchema = createInsertSchema(pages).pick({
  pageId: true,
  title: true,
  content: true,
  icon: true,
  published: true,
  order: true,
});

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

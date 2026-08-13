import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const orders = pgTable("orders", {
  id: varchar("id", { length: 32 }).primaryKey(),
  customer: varchar("customer", { length: 256 }).notNull(),
  menu: text("menu").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  cookTimeMinutes: integer("cook_time_minutes").notNull(),
  specialRequest: text("special_request"),
  status: varchar("status", { length: 32 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

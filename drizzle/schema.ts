import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const test = pgTable("test", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  studentId: text("student_id").notNull().unique(),
  roomNumber: text("room_number"),
  mealPlanBalance: text("meal_plan_balance"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const rfidCards = pgTable("rfid_cards", {
  id: serial("id").primaryKey(),
  cardId: text("card_id").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  issueDate: text("issue_date")
    .notNull()
    .default(sql`now()`),
  expiryDate: text("expiry_date"),
  lastUsed: text("last_used"),
});

export const accessLogs = pgTable("access_logs", {
  id: serial("id").primaryKey(),
  cardId: integer("card_id")
    .references(() => rfidCards.id)
    .notNull(),
  accessPoint: text("access_point").notNull(),
  accessTime: text("access_time")
    .notNull()
    .default(sql`now()`),
  isGranted: boolean("is_granted").notNull(),
});

export const mealTransactions = pgTable("meal_transactions", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  amount: numeric("amount").notNull(),
  transactionTime: text("transaction_time")
    .notNull()
    .default(sql`now()`),
  location: text("location").notNull(),
});

export const busUsage = pgTable("bus_usage", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  routeNumber: text("route_number").notNull(),
  boardingTime: text("boarding_time")
    .notNull()
    .default(sql`now()`),
  boardingLocation: text("boarding_location").notNull(),
});

// , (table) => {
//     return {
//       pk: primaryKey({ columns: [table.id, table.cardId] }),
//     };
//   }

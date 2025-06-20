import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  message: text("message"),
  interestedPackage: varchar("interested_package", { length: 100 }),
  source: varchar("source", { length: 50 }).default("landing_page"),
  isFollowedUp: boolean("is_followed_up").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  contactId: serial("contact_id").references(() => contacts.id),
  subject: varchar("subject", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("new"), // new, in_progress, completed, closed
  priority: varchar("priority", { length: 20 }).default("medium"), // low, medium, high
  assignedTo: varchar("assigned_to", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const contactsRelations = relations(contacts, ({ many }) => ({
  inquiries: many(inquiries),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  contact: one(contacts, {
    fields: [inquiries.contactId],
    references: [contacts.id],
  }),
}));

// Types
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;
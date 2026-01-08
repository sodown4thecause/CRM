import { pgTable, serial, text, timestamp, decimal, varchar } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  status: varchar('status', { length: 50 }).notNull().default('lead'),
  value: decimal('value', { precision: 10, scale: 2 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  contactId: serial('contact_id').references(() => contacts.id),
  source: varchar('source', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull(),
  probability: decimal('probability', { precision: 5, scale: 2 }),
  expectedCloseDate: timestamp('expected_close_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

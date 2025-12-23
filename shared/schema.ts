import { pgTable, text, serial, timestamp, numeric, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Inquiries (existing)
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Identity/Members
export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(() => `MEM-${Date.now()}`),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Accounts (financial accounts)
export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(() => `ACC-${Date.now()}`),
  memberId: varchar("member_id").notNull(),
  accountType: text("account_type").notNull(), // checking, savings, etc
  label: text("label").notNull(),
  balance: numeric("balance", { precision: 18, scale: 2 }).default("0"),
  currency: text("currency").default("USD"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Ledger Entries (double-entry accounting)
export const ledgerEntries = pgTable("ledger_entries", {
  id: varchar("id").primaryKey().default(() => `LED-${Date.now()}`),
  debitAccountId: varchar("debit_account_id").notNull(),
  creditAccountId: varchar("credit_account_id").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  memo: text("memo"),
  status: text("status").default("posted"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Virtual Cards
export const virtualCards = pgTable("virtual_cards", {
  id: varchar("id").primaryKey().default(() => `CARD-${Date.now()}`),
  accountId: varchar("account_id").notNull(),
  cardNumber: text("card_number").notNull(),
  cvv: text("cvv").notNull(),
  expiry: text("expiry").notNull(),
  status: text("status").default("active"),
  issuedAt: timestamp("issued_at").defaultNow(),
});

// KYC Verification
export const kycVerifications = pgTable("kyc_verifications", {
  id: varchar("id").primaryKey().default(() => `KYC-${Date.now()}`),
  memberId: varchar("member_id").notNull(),
  provider: text("provider").default("internal"),
  status: text("status").default("pending"), // pending, approved, rejected
  sessionId: text("session_id"),
  verificationData: text("verification_data"), // JSON
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// ACH Transfers
export const achTransfers = pgTable("ach_transfers", {
  id: varchar("id").primaryKey().default(() => `ACH-${Date.now()}`),
  fromAccountId: varchar("from_account_id").notNull(),
  toBank: text("to_bank").notNull(),
  toAccountNumber: text("to_account_number").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  transferType: text("transfer_type").notNull(), // credit, debit
  status: text("status").default("initiated"), // initiated, pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// Fraud Alerts
export const fraudAlerts = pgTable("fraud_alerts", {
  id: varchar("id").primaryKey().default(() => `FRAUD-${Date.now()}`),
  transactionId: varchar("transaction_id"),
  memberId: varchar("member_id"),
  ruleTriggered: text("rule_triggered").notNull(),
  severity: text("severity").default("low"), // low, medium, high
  details: text("details"), // JSON
  createdAt: timestamp("created_at").defaultNow(),
});

// Legal Acceptances
export const legalAcceptances = pgTable("legal_acceptances", {
  id: varchar("id").primaryKey().default(() => `LEG-${Date.now()}`),
  memberId: varchar("member_id").notNull(),
  documentType: text("document_type").notNull(),
  version: text("version").notNull(),
  accepted: boolean("accepted").default(true),
  acceptedAt: timestamp("accepted_at").defaultNow(),
});

// Zod Schemas
export const insertInquirySchema = createInsertSchema(inquiries).pick({
  name: true,
  email: true,
  message: true,
});

export const insertMemberSchema = createInsertSchema(members).pick({
  email: true,
  firstName: true,
  lastName: true,
});

export const insertAccountSchema = createInsertSchema(accounts).pick({
  memberId: true,
  accountType: true,
  label: true,
  currency: true,
});

export const insertLedgerEntrySchema = createInsertSchema(ledgerEntries).pick({
  debitAccountId: true,
  creditAccountId: true,
  amount: true,
  memo: true,
});

export const insertVirtualCardSchema = createInsertSchema(virtualCards).pick({
  accountId: true,
});

export const insertKycSchema = createInsertSchema(kycVerifications).pick({
  memberId: true,
  provider: true,
});

export const insertAchTransferSchema = createInsertSchema(achTransfers).pick({
  fromAccountId: true,
  toBank: true,
  toAccountNumber: true,
  amount: true,
  transferType: true,
});

// Types
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type CreateInquiryRequest = InsertInquiry;

export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type CreateMemberRequest = InsertMember;

export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type CreateAccountRequest = InsertAccount;

export type LedgerEntry = typeof ledgerEntries.$inferSelect;
export type InsertLedgerEntry = z.infer<typeof insertLedgerEntrySchema>;
export type CreateLedgerRequest = InsertLedgerEntry;

export type VirtualCard = typeof virtualCards.$inferSelect;
export type InsertVirtualCard = z.infer<typeof insertVirtualCardSchema>;

export type KycVerification = typeof kycVerifications.$inferSelect;
export type InsertKycVerification = z.infer<typeof insertKycSchema>;

export type AchTransfer = typeof achTransfers.$inferSelect;
export type InsertAchTransfer = z.infer<typeof insertAchTransferSchema>;

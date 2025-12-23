import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  inquiries,
  members,
  accounts,
  ledgerEntries,
  virtualCards,
  kycVerifications,
  achTransfers,
  type Inquiry,
  type Member,
  type Account,
  type LedgerEntry,
  type VirtualCard,
  type KycVerification,
  type AchTransfer,
  type CreateInquiryRequest,
  type CreateMemberRequest,
  type CreateAccountRequest,
  type CreateLedgerRequest,
  type InsertVirtualCard,
  type InsertKycVerification,
  type InsertAchTransfer,
} from "@shared/schema";

export interface IStorage {
  // Inquiries
  createInquiry(inquiry: CreateInquiryRequest): Promise<Inquiry>;

  // Members (Identity)
  createMember(member: CreateMemberRequest & { publicKey: string; privateKey: string }): Promise<Member>;
  getMember(id: string): Promise<Member | undefined>;
  getMemberByEmail(email: string): Promise<Member | undefined>;

  // Accounts
  createAccount(account: CreateAccountRequest): Promise<Account>;
  getAccount(id: string): Promise<Account | undefined>;
  getAccountsByMember(memberId: string): Promise<Account[]>;
  updateAccountBalance(accountId: string, newBalance: string): Promise<Account>;

  // Ledger
  createLedgerEntry(entry: CreateLedgerRequest): Promise<LedgerEntry>;
  getLedgerEntries(accountId?: string): Promise<LedgerEntry[]>;

  // Virtual Cards
  issueCard(card: InsertVirtualCard): Promise<VirtualCard>;
  getCard(id: string): Promise<VirtualCard | undefined>;
  getCardsByAccount(accountId: string): Promise<VirtualCard[]>;

  // KYC
  createKycVerification(kyc: InsertKycVerification): Promise<KycVerification>;
  getKycStatus(memberId: string): Promise<KycVerification | undefined>;
  updateKycStatus(kycId: string, status: string): Promise<KycVerification>;

  // ACH Transfers
  initiateAchTransfer(transfer: InsertAchTransfer): Promise<AchTransfer>;
  getAchTransfer(id: string): Promise<AchTransfer | undefined>;
  getAchTransfersByAccount(accountId: string): Promise<AchTransfer[]>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(inquiry: CreateInquiryRequest): Promise<Inquiry> {
    const [result] = await db.insert(inquiries).values(inquiry).returning();
    return result;
  }

  async createMember(
    member: CreateMemberRequest & { publicKey: string; privateKey: string }
  ): Promise<Member> {
    const [result] = await db
      .insert(members)
      .values({
        email: member.email,
        firstName: member.firstName,
        lastName: member.lastName,
        publicKey: member.publicKey,
        privateKey: member.privateKey,
      })
      .returning();
    return result;
  }

  async getMember(id: string): Promise<Member | undefined> {
    const [result] = await db.select().from(members).where(eq(members.id, id));
    return result;
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    const [result] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));
    return result;
  }

  async createAccount(account: CreateAccountRequest): Promise<Account> {
    const [result] = await db
      .insert(accounts)
      .values({
        memberId: account.memberId,
        accountType: account.accountType,
        label: account.label,
        currency: account.currency || "USD",
        balance: "0",
      })
      .returning();
    return result;
  }

  async getAccount(id: string): Promise<Account | undefined> {
    const [result] = await db.select().from(accounts).where(eq(accounts.id, id));
    return result;
  }

  async getAccountsByMember(memberId: string): Promise<Account[]> {
    return await db
      .select()
      .from(accounts)
      .where(eq(accounts.memberId, memberId));
  }

  async updateAccountBalance(accountId: string, newBalance: string): Promise<Account> {
    const [result] = await db
      .update(accounts)
      .set({ balance: newBalance })
      .where(eq(accounts.id, accountId))
      .returning();
    return result;
  }

  async createLedgerEntry(entry: CreateLedgerRequest): Promise<LedgerEntry> {
    const [result] = await db.insert(ledgerEntries).values(entry).returning();
    return result;
  }

  async getLedgerEntries(accountId?: string): Promise<LedgerEntry[]> {
    if (accountId) {
      return await db
        .select()
        .from(ledgerEntries)
        .where(eq(ledgerEntries.debitAccountId, accountId));
    }
    return await db.select().from(ledgerEntries);
  }

  async issueCard(card: InsertVirtualCard): Promise<VirtualCard> {
    // Generate card details
    const cardNumber = "4" + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("");
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const month = Math.floor(1 + Math.random() * 12);
    const expiry = `${String(month).padStart(2, "0")}/30`;

    const [result] = await db
      .insert(virtualCards)
      .values({
        accountId: card.accountId,
        cardNumber,
        cvv,
        expiry,
      })
      .returning();
    return result;
  }

  async getCard(id: string): Promise<VirtualCard | undefined> {
    const [result] = await db.select().from(virtualCards).where(eq(virtualCards.id, id));
    return result;
  }

  async getCardsByAccount(accountId: string): Promise<VirtualCard[]> {
    return await db
      .select()
      .from(virtualCards)
      .where(eq(virtualCards.accountId, accountId));
  }

  async createKycVerification(kyc: InsertKycVerification): Promise<KycVerification> {
    const [result] = await db.insert(kycVerifications).values(kyc).returning();
    return result;
  }

  async getKycStatus(memberId: string): Promise<KycVerification | undefined> {
    const [result] = await db
      .select()
      .from(kycVerifications)
      .where(eq(kycVerifications.memberId, memberId));
    return result;
  }

  async updateKycStatus(kycId: string, status: string): Promise<KycVerification> {
    const [result] = await db
      .update(kycVerifications)
      .set({ status, updatedAt: new Date() })
      .where(eq(kycVerifications.id, kycId))
      .returning();
    return result;
  }

  async initiateAchTransfer(transfer: InsertAchTransfer): Promise<AchTransfer> {
    const [result] = await db.insert(achTransfers).values(transfer).returning();
    return result;
  }

  async getAchTransfer(id: string): Promise<AchTransfer | undefined> {
    const [result] = await db.select().from(achTransfers).where(eq(achTransfers.id, id));
    return result;
  }

  async getAchTransfersByAccount(accountId: string): Promise<AchTransfer[]> {
    return await db
      .select()
      .from(achTransfers)
      .where(eq(achTransfers.fromAccountId, accountId));
  }
}

export const storage = new DatabaseStorage();

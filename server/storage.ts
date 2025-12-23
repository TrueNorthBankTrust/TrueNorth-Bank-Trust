import { db } from "./db";
import {
  inquiries,
  type Inquiry,
  type CreateInquiryRequest
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: CreateInquiryRequest): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: CreateInquiryRequest): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();

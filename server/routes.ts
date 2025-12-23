import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { createFintech } from "./fintech";
import { z } from "zod";

// Initialize OASIS fintech system
const fintech = createFintech(process.env.ENCRYPTION_KEY || "default-key");

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============== INQUIRIES ==============
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // ============== MEMBERS (IDENTITY) ==============
  app.post(api.members.create.path, async (req, res) => {
    try {
      const input = api.members.create.input.parse(req.body);
      const member = await storage.createMember({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        publicKey: input.publicKey,
        privateKey: input.privateKey,
      });
      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.get(api.members.getById.path, async (req, res) => {
    try {
      const member = await storage.getMember(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (err) {
      throw err;
    }
  });

  // ============== ACCOUNTS ==============
  app.post(api.accounts.create.path, async (req, res) => {
    try {
      const input = api.accounts.create.input.parse(req.body);
      const account = await storage.createAccount(input);
      res.status(201).json(account);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.get(api.accounts.getById.path, async (req, res) => {
    try {
      const account = await storage.getAccount(req.params.id);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      res.json(account);
    } catch (err) {
      throw err;
    }
  });

  app.get(api.accounts.getByMember.path, async (req, res) => {
    try {
      const accounts = await storage.getAccountsByMember(req.params.memberId);
      res.json(accounts);
    } catch (err) {
      throw err;
    }
  });

  // ============== LEDGER ==============
  app.post(api.ledger.create.path, async (req, res) => {
    try {
      const input = api.ledger.create.input.parse(req.body);
      
      // Double-entry check
      const debitAccount = await storage.getAccount(input.debitAccountId);
      const creditAccount = await storage.getAccount(input.creditAccountId);
      
      if (!debitAccount || !creditAccount) {
        return res.status(400).json({ message: "Invalid account" });
      }

      const entry = await storage.createLedgerEntry(input);
      
      // Update balances
      const newDebitBalance = (parseFloat(debitAccount.balance || "0") - parseFloat(input.amount)).toString();
      const newCreditBalance = (parseFloat(creditAccount.balance || "0") + parseFloat(input.amount)).toString();
      
      await storage.updateAccountBalance(input.debitAccountId, newDebitBalance);
      await storage.updateAccountBalance(input.creditAccountId, newCreditBalance);
      
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.get(api.ledger.getByAccount.path, async (req, res) => {
    try {
      const entries = await storage.getLedgerEntries(req.params.accountId);
      res.json(entries);
    } catch (err) {
      throw err;
    }
  });

  // ============== KYC ==============
  app.post(api.kyc.create.path, async (req, res) => {
    try {
      const input = api.kyc.create.input.parse(req.body);
      const kyc = await storage.createKycVerification(input);
      res.status(201).json(kyc);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.get(api.kyc.getStatus.path, async (req, res) => {
    try {
      const kyc = await storage.getKycStatus(req.params.memberId);
      if (!kyc) {
        return res.status(404).json({ message: "KYC not found" });
      }
      res.json(kyc);
    } catch (err) {
      throw err;
    }
  });

  // ============== VIRTUAL CARDS ==============
  app.post(api.cards.issue.path, async (req, res) => {
    try {
      const input = api.cards.issue.input.parse(req.body);
      const card = await storage.issueCard({ accountId: input.accountId });
      res.status(201).json(card);
    } catch (err) {
      throw err;
    }
  });

  app.get(api.cards.getByAccount.path, async (req, res) => {
    try {
      const cards = await storage.getCardsByAccount(req.params.accountId);
      res.json(cards);
    } catch (err) {
      throw err;
    }
  });

  // ============== ACH TRANSFERS ==============
  app.post(api.ach.initiate.path, async (req, res) => {
    try {
      const input = api.ach.initiate.input.parse(req.body);
      const transfer = await storage.initiateAchTransfer(input);
      res.status(201).json(transfer);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.get(api.ach.getByAccount.path, async (req, res) => {
    try {
      const transfers = await storage.getAchTransfersByAccount(req.params.accountId);
      res.json(transfers);
    } catch (err) {
      throw err;
    }
  });

  // ============== HEALTH CHECK ==============
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return httpServer;
}

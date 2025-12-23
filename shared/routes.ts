import { z } from "zod";
import {
  insertInquirySchema,
  insertMemberSchema,
  insertAccountSchema,
  insertLedgerEntrySchema,
  insertKycSchema,
  insertAchTransferSchema,
  inquiries,
  members,
  accounts,
  ledgerEntries,
  kycVerifications,
  achTransfers,
} from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  inquiries: {
    create: {
      method: "POST" as const,
      path: "/api/inquiries",
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  members: {
    create: {
      method: "POST" as const,
      path: "/api/members",
      input: insertMemberSchema.extend({
        publicKey: z.string(),
        privateKey: z.string(),
      }),
      responses: {
        201: z.custom<typeof members.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getById: {
      method: "GET" as const,
      path: "/api/members/:id",
      responses: {
        200: z.custom<typeof members.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  accounts: {
    create: {
      method: "POST" as const,
      path: "/api/accounts",
      input: insertAccountSchema,
      responses: {
        201: z.custom<typeof accounts.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getById: {
      method: "GET" as const,
      path: "/api/accounts/:id",
      responses: {
        200: z.custom<typeof accounts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    getByMember: {
      method: "GET" as const,
      path: "/api/members/:memberId/accounts",
      responses: {
        200: z.array(z.custom<typeof accounts.$inferSelect>()),
      },
    },
  },
  ledger: {
    create: {
      method: "POST" as const,
      path: "/api/ledger",
      input: insertLedgerEntrySchema,
      responses: {
        201: z.custom<typeof ledgerEntries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getByAccount: {
      method: "GET" as const,
      path: "/api/accounts/:accountId/ledger",
      responses: {
        200: z.array(z.custom<typeof ledgerEntries.$inferSelect>()),
      },
    },
  },
  kyc: {
    create: {
      method: "POST" as const,
      path: "/api/kyc",
      input: insertKycSchema,
      responses: {
        201: z.custom<typeof kycVerifications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getStatus: {
      method: "GET" as const,
      path: "/api/kyc/:memberId",
      responses: {
        200: z.custom<typeof kycVerifications.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  ach: {
    initiate: {
      method: "POST" as const,
      path: "/api/ach-transfer",
      input: insertAchTransferSchema,
      responses: {
        201: z.custom<typeof achTransfers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getByAccount: {
      method: "GET" as const,
      path: "/api/accounts/:accountId/ach-transfers",
      responses: {
        200: z.array(z.custom<typeof achTransfers.$inferSelect>()),
      },
    },
  },
  cards: {
    issue: {
      method: "POST" as const,
      path: "/api/cards/issue",
      input: z.object({ accountId: z.string() }),
      responses: {
        201: z.object({
          cardId: z.string(),
          cardNumber: z.string(),
          cvv: z.string(),
          expiry: z.string(),
          status: z.string(),
        }),
      },
    },
    getByAccount: {
      method: "GET" as const,
      path: "/api/accounts/:accountId/cards",
      responses: {
        200: z.array(
          z.object({
            id: z.string(),
            cardNumber: z.string(),
            status: z.string(),
          })
        ),
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

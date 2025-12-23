import { randomBytes } from "crypto";
import { createCipheriv, createDecipheriv } from "crypto";

// OASIS Fintech Core - TypeScript Implementation

// Identity Layer
export class IdentityKeypair {
  memberId: string;
  publicKey: string;
  privateKey: string;

  constructor() {
    this.memberId = `MEM-${Date.now()}-${randomBytes(8).toString("hex")}`;
    this.publicKey = `PUBKEY-${randomBytes(16).toString("hex")}`;
    this.privateKey = `PRIVKEY-${randomBytes(16).toString("hex")}`;
  }
}

// Session Manager
export class SessionManager {
  private sessions: Map<string, any> = new Map();

  createSession(memberId: string): string {
    const sessionId = randomBytes(16).toString("hex");
    this.sessions.set(sessionId, {
      memberId,
      createdAt: new Date().toISOString(),
    });
    return sessionId;
  }

  getSession(sessionId: string) {
    return this.sessions.get(sessionId);
  }

  deleteSession(sessionId: string) {
    this.sessions.delete(sessionId);
  }
}

// Encryption Service
export class Encryptor {
  private key: Buffer;
  private algorithm = "aes-256-gcm";

  constructor(keyString: string) {
    // Hash key to 32 bytes
    this.key = Buffer.alloc(32);
    const keyBuf = Buffer.from(keyString);
    keyBuf.copy(this.key, 0, 0, Math.min(keyBuf.length, 32));
  }

  encrypt(plaintext: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();
    return `${iv.toString("hex")}:${encrypted}:${authTag.toString("hex")}`;
  }

  decrypt(ciphertext: string): string {
    const [ivHex, encrypted, authTagHex] = ciphertext.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}

// Fraud Detection Engine
export class FraudEngine {
  private rules: Array<{
    name: string;
    check: (txn: any) => boolean;
  }> = [];
  alerts: any[] = [];

  addRule(ruleName: string, condition: (txn: any) => boolean) {
    this.rules.push({ name: ruleName, check: condition });
  }

  evaluate(transaction: any): boolean {
    for (const rule of this.rules) {
      if (rule.check(transaction)) {
        this.alerts.push({
          transaction,
          ruleTriggered: rule.name,
          timestamp: new Date().toISOString(),
        });
        return true;
      }
    }
    return false;
  }
}

// Access Control (RBAC)
export class AccessPolicy {
  private roles: Map<string, string> = new Map();

  assignRole(userId: string, role: string) {
    this.roles.set(userId, role);
  }

  checkPermission(userId: string, action: string): boolean {
    const role = this.roles.get(userId);
    if (role === "admin") return true;
    if (role === "user" && ["transfer", "view", "card"].includes(action)) {
      return true;
    }
    return false;
  }
}

// Reconciliation Engine
export class Reconciler {
  reconcile(
    internalEntries: any[],
    externalStatements: any[]
  ): { matched: any[]; unmatched: any[] } {
    const matched: any[] = [];
    const unmatched: any[] = [];

    for (const ext of externalStatements) {
      const found = internalEntries.find(
        (i) =>
          parseFloat(i.amount || 0) === parseFloat(ext.amount || 0) &&
          i.timestamp?.slice(0, 10) === ext.timestamp?.slice(0, 10)
      );

      if (found) {
        matched.push([found, ext]);
      } else {
        unmatched.push(ext);
      }
    }

    return { matched, unmatched };
  }
}

// Webhook Router
export class WebhookRouter {
  private routes: Map<string, Function> = new Map();

  register(eventType: string, handler: Function) {
    this.routes.set(eventType, handler);
  }

  async handleEvent(eventType: string, payload: any): Promise<any> {
    const handler = this.routes.get(eventType);
    if (handler) {
      return await handler(payload);
    }
    return { error: `No handler for ${eventType}` };
  }
}

// Workflow Engine
export class WorkflowEngine {
  private steps: Array<{
    label: string;
    fn: (context: any) => Promise<any>;
  }> = [];

  addStep(label: string, fn: (context: any) => Promise<any>) {
    this.steps.push({ label, fn });
  }

  async run(context: any = {}): Promise<any[]> {
    const log: any[] = [];
    for (const step of this.steps) {
      try {
        const result = await step.fn(context);
        log.push({ step: step.label, status: "success", result });
        context = { ...context, ...result };
      } catch (err) {
        log.push({ step: step.label, status: "error", error: String(err) });
        throw err;
      }
    }
    return log;
  }
}

// Report Generator
export class ReportGenerator {
  constructor(private ledgerEntries: any[]) {}

  monthlySummary(month: number, year: number): any {
    const filtered = this.ledgerEntries.filter((e) => {
      const date = new Date(e.createdAt);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

    const total = filtered.reduce(
      (sum, e) => sum + parseFloat(e.amount || 0),
      0
    );
    return {
      month,
      year,
      count: filtered.length,
      totalAmount: total,
    };
  }
}

// Plugin Connector
export class PluginConnector {
  private plugins: Map<string, any> = new Map();

  registerPlugin(name: string, functions: any) {
    this.plugins.set(name, functions);
  }

  execute(pluginName: string, functionName: string, ...args: any[]): any {
    const plugin = this.plugins.get(pluginName);
    if (plugin && plugin[functionName]) {
      return plugin[functionName](...args);
    }
    return null;
  }
}

// Initialize Core Services
export const createFintech = (encryptionKey: string = "default-key") => {
  return {
    identity: new IdentityKeypair(),
    sessions: new SessionManager(),
    encryptor: new Encryptor(encryptionKey),
    fraud: new FraudEngine(),
    access: new AccessPolicy(),
    reconciler: new Reconciler(),
    webhooks: new WebhookRouter(),
    workflow: new WorkflowEngine(),
    plugins: new PluginConnector(),
  };
};

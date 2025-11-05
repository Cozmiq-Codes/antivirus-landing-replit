import { randomUUID } from "crypto";
import type { Order, PromoCodeInput } from "@shared/schema";

export interface IStorage {
  createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  validatePromoCode(code: string): Promise<{ valid: boolean; discount: number }>;
}

export class MemStorage implements IStorage {
  private orders: Map<string, Order>;
  private promoCodes: Map<string, number>;

  constructor() {
    this.orders = new Map();
    this.promoCodes = new Map([
      ["SAVE10", 0.1],
      ["WELCOME15", 0.15],
      ["ULTIMATE20", 0.2],
    ]);
  }

  async createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async validatePromoCode(code: string): Promise<{ valid: boolean; discount: number }> {
    const discount = this.promoCodes.get(code.toUpperCase());
    if (discount !== undefined) {
      return { valid: true, discount };
    }
    return { valid: false, discount: 0 };
  }
}

export const storage = new MemStorage();

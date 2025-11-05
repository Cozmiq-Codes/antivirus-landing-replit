import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createOrderSchema, promoCodeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate promo code
  app.post("/api/promo-code/validate", async (req, res) => {
    try {
      const { code } = promoCodeSchema.parse(req.body);
      const result = await storage.validatePromoCode(code);
      
      if (result.valid) {
        return res.json({
          valid: true,
          discount: result.discount,
          message: `Promo code applied - ${(result.discount * 100).toFixed(0)}% off`,
        });
      } else {
        return res.status(400).json({
          valid: false,
          discount: 0,
          message: "Invalid promo code",
        });
      }
    } catch (error) {
      return res.status(400).json({
        valid: false,
        discount: 0,
        message: "Invalid request",
      });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = createOrderSchema.parse(req.body);
      
      // Calculate totals
      const basePrice = orderData.cartItem.price;
      const addOnsTotal = orderData.cartItem.addOns?.reduce(
        (sum, addon) =>
          sum +
          (orderData.cartItem.billingTerm === "monthly"
            ? addon.monthlyPrice
            : addon.yearlyPrice),
        0
      ) || 0;

      const subtotal = basePrice + addOnsTotal;
      
      // Apply promo code discount if provided
      let discount = 0;
      if (orderData.promoCode) {
        const promoResult = await storage.validatePromoCode(orderData.promoCode);
        if (promoResult.valid) {
          discount = promoResult.discount;
        }
      }

      const discountAmount = basePrice * discount;
      const total = subtotal - discountAmount;

      const order = await storage.createOrder({
        email: orderData.email,
        cartItem: orderData.cartItem,
        promoCode: orderData.promoCode,
        discount,
        subtotal,
        total,
      });

      return res.status(201).json({
        success: true,
        order: {
          id: order.id,
          email: order.email,
          total: order.total,
          createdAt: order.createdAt,
        },
        message: "Order created successfully",
      });
    } catch (error) {
      console.error("Order creation error:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to create order",
      });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      return res.json({
        success: true,
        order,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve order",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

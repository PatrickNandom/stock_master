// src/app/api/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole, PaymentType, SaleStatus } from "@prisma/client";

// GET all sales (filtered by role)
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId, role, userId } = authResult.user;

    // STAFF can only see their own sales
    // OWNER and ADMIN can see all sales
    const sales = await prisma.sale.findMany({
      where: {
        businessId,
        // If STAFF, filter by their sales (we'll need to add userId to Sale model for this)
        // For now, STAFF sees all sales (adjust schema if needed)
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    console.error("Get sales error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create sale (All authenticated users)
export async function POST(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const body = await request.json();
    const { items, paymentType } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required and must be an array" },
        { status: 400 }
      );
    }

    if (!paymentType || !Object.values(PaymentType).includes(paymentType)) {
      return NextResponse.json(
        { error: "Valid payment type is required (CASH or TRANSFER)" },
        { status: 400 }
      );
    }

    // Validate and calculate total in a transaction
    const sale = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const saleItemsData = [];

      for (const item of items) {
        const { productId, quantity } = item;

        if (!productId || !quantity || quantity <= 0) {
          throw new Error("Invalid item data");
        }

        // Check product exists and has enough quantity
        const product = await tx.product.findFirst({
          where: { id: productId, businessId },
        });

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        if (product.quantity < quantity) {
          throw new Error(`Insufficient quantity for product ${product.name}`);
        }

        // Calculate item total
        const itemTotal = product.price * quantity;
        totalAmount += itemTotal;

        // Update product quantity
        await tx.product.update({
          where: { id: productId },
          data: { quantity: product.quantity - quantity },
        });

        saleItemsData.push({
          productId,
          quantity,
          priceAtSale: product.price,
        });

        // Create history entry for sold product
        await tx.history.create({
          data: {
            type: "SOLD",
            description: `${quantity} unit(s) of "${product.name}" was sold`,
            productId: product.id,
            businessId,
          },
        });
      }

      // Create sale
      const newSale = await tx.sale.create({
        data: {
          totalAmount,
          paymentType,
          status: SaleStatus.COMPLETED,
          businessId,
          items: {
            create: saleItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return newSale;
    });

    return NextResponse.json(
      {
        message: "Sale created successfully",
        sale,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create sale error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

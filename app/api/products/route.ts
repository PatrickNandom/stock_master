// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole } from "@prisma/client";

// GET all products (All authenticated users can view)
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;

    const products = await prisma.product.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create product (Only OWNER and ADMIN)
export async function POST(request: NextRequest) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const body = await request.json();
    const { name, price, quantity, image, description } = body;

    // Validation
    if (!name || price === undefined || quantity === undefined) {
      return NextResponse.json(
        { error: "Name, price, and quantity are required" },
        { status: 400 }
      );
    }

    if (price < 0 || quantity < 0) {
      return NextResponse.json(
        { error: "Price and quantity must be non-negative" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        image: image || null,
        description: description || null,
        businessId,
      },
    });

    // Create history entry
    await prisma.history.create({
      data: {
        type: "ADDED",
        description: `Product "${name}" was added to inventory`,
        productId: product.id,
        businessId,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

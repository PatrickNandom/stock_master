// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole } from "@prisma/client";

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { id } = params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        businessId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT update product (Only OWNER and ADMIN)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { id } = params;
    const body = await request.json();
    const { name, price, quantity, image, description } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findFirst({
      where: { id, businessId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Validation
    if (price !== undefined && price < 0) {
      return NextResponse.json(
        { error: "Price must be non-negative" },
        { status: 400 }
      );
    }

    if (quantity !== undefined && quantity < 0) {
      return NextResponse.json(
        { error: "Quantity must be non-negative" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(quantity !== undefined && { quantity: parseInt(quantity) }),
        ...(image !== undefined && { image }),
        ...(description !== undefined && { description }),
      },
    });

    // Create history entry
    await prisma.history.create({
      data: {
        type: "UPDATED",
        description: `Product "${product.name}" was updated`,
        productId: product.id,
        businessId,
      },
    });

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE product (Only OWNER and ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { id } = params;

    const product = await prisma.product.findFirst({
      where: { id, businessId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// src/app/api/business/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole } from "@prisma/client";

// GET business info (All authenticated users)
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: {
        id: true,
        name: true,
        address: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ business }, { status: 200 });
  } catch (error) {
    console.error("Get business error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT update business (Only OWNER)
export async function PUT(request: NextRequest) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const body = await request.json();
    const { name, address, phone } = body;

    // Validation: at least one field must be provided
    if (!name && !address && !phone) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    const business = await prisma.business.update({
      where: { id: businessId },
      data: {
        ...(name && { name }),
        ...(address !== undefined && { address }),
        ...(phone !== undefined && { phone }),
      },
      select: {
        id: true,
        name: true,
        address: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Business updated successfully",
        business,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update business error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

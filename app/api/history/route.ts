// src/app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole } from "@prisma/client";

// GET history (Only OWNER and ADMIN)
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { searchParams } = new URL(request.url);

    // Optional filters
    const type = searchParams.get("type");
    const productId = searchParams.get("productId");
    const limit = searchParams.get("limit");

    const history = await prisma.history.findMany({
      where: {
        businessId,
        ...(type && { type: type as "ADDED" | "UPDATED" | "SOLD" }),
        ...(productId && { productId }),
      },
      orderBy: { id: "desc" },
      ...(limit && { take: parseInt(limit) }),
    });

    return NextResponse.json({ history }, { status: 200 });
  } catch (error) {
    console.error("Get history error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

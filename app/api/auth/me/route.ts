// app/api/auth/me/route.ts - Get Current User

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { UserResponse, ApiError } from "@/app/types";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json<ApiError>(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json<ApiError>(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<UserResponse>({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId,
        createdAt: user.createdAt,
        business: user.business,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json<ApiError>(
      { error: "Failed to get user" },
      { status: 500 },
    );
  }
}

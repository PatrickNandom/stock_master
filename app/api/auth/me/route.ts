// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = requireAuth(request);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { userId } = authResult.user;

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        businessId: true,
        createdAt: true,
        business: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

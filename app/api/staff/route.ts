// src/app/api/staff/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { hashPassword } from "@/lib/auth";
import { UserRole } from "@prisma/client";

// GET all staff (Only OWNER and ADMIN)
export async function GET(request: NextRequest) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;

    const staff = await prisma.user.findMany({
      where: { businessId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    console.error("Get staff error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create staff (Only OWNER and ADMIN)
export async function POST(request: NextRequest) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER, UserRole.ADMIN]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId, role: creatorRole } = authResult.user;
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (!role || !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: "Valid role is required (ADMIN or STAFF)" },
        { status: 400 }
      );
    }

    // ADMIN cannot create OWNER
    if (creatorRole === UserRole.ADMIN && role === UserRole.OWNER) {
      return NextResponse.json(
        { error: "Admins cannot create owners" },
        { status: 403 }
      );
    }

    // Only OWNER can create ADMIN
    if (role === UserRole.ADMIN && creatorRole !== UserRole.OWNER) {
      return NextResponse.json(
        { error: "Only owners can create admins" },
        { status: 403 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create staff user
    const newStaff = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        businessId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Staff member created successfully",
        staff: newStaff,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create staff error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

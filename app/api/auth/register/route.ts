// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      ownerName,
      address,
      email,
      phone,
      password,
      confirmPassword,
    } = body;

    // Validation
    if (
      !businessName ||
      !ownerName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { email },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create business and owner user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create business
      const business = await tx.business.create({
        data: {
          name: businessName,
          address: address || null,
          email,
          phone: phone || null,
          password: hashedPassword,
        },
      });

      // Create owner user
      const owner = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: ownerName,
          role: UserRole.OWNER,
          businessId: business.id,
        },
      });

      return { business, owner };
    });

    // Generate JWT token
    const token = signToken({
      userId: result.owner.id,
      businessId: result.business.id,
      role: result.owner.role,
      email: result.owner.email,
    });

    return NextResponse.json(
      {
        message: "Business registered successfully",
        token,
        user: {
          id: result.owner.id,
          name: result.owner.name,
          email: result.owner.email,
          role: result.owner.role,
          businessId: result.business.id,
          businessName: result.business.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

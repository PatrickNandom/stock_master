// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { createToken, setAuthCookie } from "@/lib/auth";
import type { AuthResponse, ApiError } from "@/app/types";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Add ownerName (same as businessName) and confirmPassword for validation
    const dataToValidate = {
      ...body,
      ownerName: body.businessName, // Use businessName as ownerName
      confirmPassword: body.password, // Use password as confirmPassword
    };

    // Validate input
    const validatedData = registerSchema.parse(dataToValidate);

    // Check if business email already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { email: validatedData.email },
    });

    if (existingBusiness) {
      return NextResponse.json<ApiError>(
        { error: "Business with this email already exists" },
        { status: 400 }
      );
    }

    // Check if user email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json<ApiError>(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create business and owner user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create business
      const business = await tx.business.create({
        data: {
          name: validatedData.businessName,
          email: validatedData.email,
          address: validatedData.address,
          phone: validatedData.phone,
          password: hashedPassword,
        },
      });

      // Create owner user (ownerName = businessName)
      const user = await tx.user.create({
        data: {
          name: validatedData.businessName, // Using businessName as owner name
          email: validatedData.email,
          password: hashedPassword,
          role: "OWNER",
          businessId: business.id,
        },
      });

      return { business, user };
    });

    // Create JWT token
    const token = await createToken({
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role,
      businessId: result.business.id,
    });

    // Set auth cookie
    await setAuthCookie(token);

    // Return response matching AuthResponse type
    return NextResponse.json<AuthResponse>({
      message: "Registration successful",
      token,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        businessId: result.business.id,
        businessName: result.business.name,
      },
    });
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json<ApiError>(
        { error: error.message || "Validation failed" },
        { status: 400 }
      );
    }

    // Handle Prisma unique constraint errors
    if (typeof error === "object" && error !== null && "code" in error) {
      if (error.code === "P2002") {
        return NextResponse.json<ApiError>(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json<ApiError>(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
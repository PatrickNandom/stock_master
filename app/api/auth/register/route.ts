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
    const validatedData = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json<ApiError>(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    // Check if business email exists
    const existingBusiness = await prisma.business.findUnique({
      where: { email: validatedData.email },
    });

    if (existingBusiness) {
      return NextResponse.json<ApiError>(
        { error: "Business email already registered" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create business and owner in transaction
    const result = await prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name: validatedData.businessName,
          email: validatedData.email,
          password: hashedPassword,
          phone: validatedData.phone,
          address: validatedData.address,
        },
      });

      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.ownerName,
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
        { error: error.message },
        { status: 400 },
      );
    }
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json<ApiError>({ error: message }, { status: 500 });
  }
}

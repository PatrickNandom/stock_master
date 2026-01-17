// / app/api/auth/login/route.ts;

import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import { createToken, setAuthCookie } from "@/lib/auth";
import type { AuthResponse, ApiError } from "@/app/types";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user with business
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        business: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json<ApiError>(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await compare(
      validatedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json<ApiError>(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      businessId: user.businessId,
    });

    // Set auth cookie
    await setAuthCookie(token);

    // Return response matching AuthResponse type
    return NextResponse.json<AuthResponse>({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.business.id,
        businessName: user.business.name,
      },
    });
  } catch (error: unknown) {
    // 2. Change 'any' to 'unknown'
    console.error("Login error:", error);

    // 3. Use 'instanceof' to narrow the type
    if (error instanceof ZodError) {
      return NextResponse.json<ApiError>(
        { error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json<ApiError>(
      { error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}

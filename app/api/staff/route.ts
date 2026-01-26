// app/api/staff/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ZodError, z } from "zod";
import { Prisma } from "@prisma/client";


// Validation schema for creating staff
const createStaffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "STAFF"]),
  phone: z.string().optional(),
});

// GET - List all staff members
export const GET = async (request: Request) => {
  try {
    // Verify authentication using getSession
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only OWNER and ADMIN can view staff list
    if (session.role !== "OWNER" && session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 },
      );
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where clause with proper typing
    const where: Prisma.UserWhereInput = {
      businessId: session.businessId,
      role: { in: ["ADMIN", "STAFF"] },
    };

    if (role && (role === "ADMIN" || role === "STAFF")) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get staff members with pagination
    const [staff, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      staff,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("Get staff error:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff members" },
      { status: 500 },
    );
  }
};

// POST - Create new staff member
export const POST = async (request: Request) => {
  try {
    // Verify authentication using getSession
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only OWNER and ADMIN can create staff
    if (session.role !== "OWNER" && session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = createStaffSchema.parse(body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create staff member with businessId from session
    const staff = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        phone: validatedData.phone,
        businessId: session.businessId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Staff member created successfully",
        staff,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create staff error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validation failed" },
        { status: 400 },
      );
    }

    // Handle Prisma unique constraint errors
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create staff member" },
      { status: 500 },
    );
  }
};

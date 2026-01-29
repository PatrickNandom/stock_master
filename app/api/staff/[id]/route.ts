// app/api/staff/[id]/route.ts
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ZodError, z } from "zod";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; // Changed Request to NextRequest for consistency

export const runtime = "nodejs";

const updateStaffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  role: z.enum(["ADMIN", "STAFF"]).optional(),
  phone: z.string().optional(),
});

// GET - Get single staff member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Type updated to Promise
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params; 

    const staff = await prisma.user.findUnique({
      where: {
        id,
        businessId: session.businessId,
        role: { in: ["ADMIN", "STAFF"] },
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

    if (!staff)
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 },
      );

    return NextResponse.json({ staff });
  } catch (error) {
    console.error("Get staff member error:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff member" },
      { status: 500 },
    );
  }
}

// PUT/PATCH - Update staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (session.role !== "OWNER" && session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 },
      );
    }

    const { id } = await params; // Await the params
    const body = await request.json();
    const validatedData = updateStaffSchema.parse(body);

    const existingStaff = await prisma.user.findUnique({
      where: {
        id,
        businessId: session.businessId,
        role: { in: ["ADMIN", "STAFF"] },
      },
    });

    if (!existingStaff)
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 },
      );

    if (validatedData.email && validatedData.email !== existingStaff.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });
      if (emailExists)
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 },
        );
    }

    const updateData: Prisma.UserUpdateInput = {
      ...(validatedData.name && { name: validatedData.name }),
      ...(validatedData.email && { email: validatedData.email }),
      ...(validatedData.role && { role: validatedData.role }),
      ...(validatedData.phone !== undefined && { phone: validatedData.phone }),
    };

    if (validatedData.password) {
      updateData.password = await hash(validatedData.password, 12);
    }

    const staff = await prisma.user.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({
      message: "Staff member updated successfully",
      staff,
    });
  } catch (error) {
    console.error("Update staff error:", error);
    if (error instanceof ZodError)
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validation failed" },
        { status: 400 },
      );
    return NextResponse.json(
      { error: "Failed to update staff member" },
      { status: 500 },
    );
  }
}

export const PATCH = PUT;

// DELETE - Delete staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (session.role !== "OWNER") {
      return NextResponse.json(
        { error: "Forbidden: Only owners can delete staff members" },
        { status: 403 },
      );
    }

    const { id } = await params; // Await the params

    const existingStaff = await prisma.user.findUnique({
      where: {
        id,
        businessId: session.businessId,
        role: { in: ["ADMIN", "STAFF"] },
      },
    });

    if (!existingStaff)
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 },
      );

    if (id === session.userId) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Delete staff error:", error);
    return NextResponse.json(
      { error: "Failed to delete staff member" },
      { status: 500 },
    );
  }
}

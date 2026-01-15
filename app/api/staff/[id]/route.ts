// app/api/staff/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/middleware";
import { UserRole } from "@prisma/client";

// PUT update staff role (Only OWNER)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { id } = params;
    const body = await request.json();
    const { role } = body;

    // Validation
    if (!role || !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: "Valid role is required (OWNER, ADMIN, or STAFF)" },
        { status: 400 }
      );
    }

    // Check if user exists and belongs to the business
    const existingUser = await prisma.user.findFirst({
      where: { id, businessId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    // Prevent changing owner role
    if (existingUser.role === UserRole.OWNER) {
      return NextResponse.json(
        { error: "Cannot modify owner role" },
        { status: 403 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
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
        message: "Staff role updated successfully",
        staff: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update staff error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE staff (Only OWNER)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = requireAuth(request, [UserRole.OWNER]);

    if (!authResult.authorized || !authResult.user) {
      return authResult.response!;
    }

    const { businessId } = authResult.user;
    const { id } = params;

    // Check if user exists and belongs to the business
    const existingUser = await prisma.user.findFirst({
      where: { id, businessId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Staff member not found" },
        { status: 404 }
      );
    }

    // Prevent deleting owner
    if (existingUser.role === UserRole.OWNER) {
      return NextResponse.json(
        { error: "Cannot delete owner account" },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Staff member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete staff error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

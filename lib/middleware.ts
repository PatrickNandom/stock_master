// app/lib/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractToken, JWTPayload } from "./auth";
import { UserRole } from "@prisma/client";

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

// Verify authentication and attach user to request
export function authenticate(request: NextRequest): {
  authorized: boolean;
  user?: JWTPayload;
  response?: NextResponse;
} {
  const authHeader = request.headers.get("authorization");
  const token = extractToken(authHeader);

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized. No token provided." },
        { status: 401 }
      ),
    };
  }

  const user = verifyToken(token);

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized. Invalid or expired token." },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, user };
}

// Check if user has required role
export function authorizeRoles(
  user: JWTPayload,
  allowedRoles: UserRole[]
): boolean {
  return allowedRoles.includes(user.role);
}

// Combined middleware: authenticate + authorize
export function requireAuth(
  request: NextRequest,
  allowedRoles?: UserRole[]
): {
  authorized: boolean;
  user?: JWTPayload;
  response?: NextResponse;
} {
  const authResult = authenticate(request);

  if (!authResult.authorized || !authResult.user) {
    return authResult;
  }

  // If roles are specified, check authorization
  if (allowedRoles && !authorizeRoles(authResult.user, allowedRoles)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden. Insufficient permissions." },
        { status: 403 }
      ),
    };
  }

  return authResult;
}

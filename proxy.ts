import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/login", "/register", "/"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/products",
    "/sales",
    "/inventory",
    "/staff",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Get token from cookie
  const token = request.cookies.get("auth-token")?.value;

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = payload;
    } catch (error) {
      console.log(error);
      session = null;
    }
  }

  // Redirect authenticated users away from auth pages
  if (isPublicRoute && session && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

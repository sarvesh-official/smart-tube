import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/", // Protect home page
  "/dashboard(.*)", // Protect dashboard and its subpaths
];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Exclude the `/signin` route from the protection logic
  if (path === "/signin") {
    return NextResponse.next();
  }
  else if (path === "/api/auth/sigin") {
    return NextResponse.next();
  }

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => new RegExp(route).test(path));

  // Redirect unauthenticated users to the sign-in page
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Redirect authenticated users from `/signin` to the home page
  if (token && path === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api/auth).*)"],
};

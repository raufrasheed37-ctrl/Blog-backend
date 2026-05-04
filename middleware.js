import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "auth-token";

function isProtectedPath(pathname) {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return true;
  }

  if (pathname === "/contact") {
    return true;
  }

  if (pathname === "/blog/create") {
    return true;
  }

  return pathname.startsWith("/blog/") && pathname.endsWith("/edit");
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (isProtectedPath(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/contact", "/blog/:path*"],
};
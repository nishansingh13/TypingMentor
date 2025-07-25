import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

 
  if (!token) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account"], 
};

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { supabase } from "./lib/supabaseClient";
import { NextResponse } from "next/server";
import { checkUser } from "./lib/checkUser";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // const user = await supabase.auth.getUser();
  const user = await checkUser();
  console.log();

  if (
    !user &&
    ["/checkout", "/profile"].some((path) => pathname.startsWith(path))
  ) {
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user IS logged in and tries to access /login or /register, redirect to homepage
  if (user && ["/login", "/register"].includes(pathname)) {
    // return NextResponse.redirect(new URL("/", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/checkout",
    "/profile/:path*",
    "/login",
    "/register",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

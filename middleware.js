import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Middleware kiểm tra người dùng đã đăng nhập hay chưa
const customMiddleware = clerkMiddleware((req) => {
  const { userId } = req.auth;

  // Lấy URL hiện tại
  const url = req.nextUrl.clone();

  // Nếu người dùng chưa đăng nhập và đang truy cập trang "/", chuyển hướng đến "/sign-in"
  if (!userId && url.pathname === '/') {
    url.pathname = '/sign-in'; // Chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(url);
  }

  // Nếu đã đăng nhập hoặc không phải trang "/", cho phép tiếp tục
  return NextResponse.next();
});

export default customMiddleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Áp dụng middleware cho trang "/"
    '/',
  ],
};

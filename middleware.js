import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // ... các tùy chọn khác của clerkMiddleware
  publicRoutes: [
    // Danh sách các route công cộng, không yêu cầu đăng nhập
    '/sign-in',
    '/sign-up',
    // ... các route công cộng khác
  ],
  // Hàm này sẽ được gọi trước khi xử lý request
  async before(req, res) {
    // Kiểm tra nếu người dùng đang truy cập vào trang chủ ("/")
    if (req.url === '/') {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      if (!req.auth) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }
  },
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};






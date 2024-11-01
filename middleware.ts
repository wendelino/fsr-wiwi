import { NextRequest, NextResponse } from "next/server";
import { getLocale, aviableLocales  } from "./locales/getTranslation";
 
export async function middleware(request: NextRequest) {
  const locales = await aviableLocales()

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = await getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.xml|.*\\.ico|files|api|_next/static|_next/image|favicon.ico).*)",

    // Optional: only run on root (/) URL
    // '/'
  ],
};

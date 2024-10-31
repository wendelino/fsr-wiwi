import { NextRequest, NextResponse } from "next/server";

const locales = ["de", "en"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) { 
  let lang = request.cookies.get("lang")?.value 
  
  if (!lang) {
    const device_lang = request.headers.get("accept-language");
    
    lang = device_lang?.split(",")[1].split(";")[0]; 
  }

  if (lang && locales.includes(lang)) return lang; 
  return "de";
}

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\.png|.*\\.jpg|.*\\.jpeg|files|api|_next/static|_next/image|favicon.ico).*)",

    // Optional: only run on root (/) URL
    // '/'
  ],
};

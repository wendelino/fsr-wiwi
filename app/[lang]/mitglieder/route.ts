import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) { 
  console.log("------GET-----");
  console.log("request.url: " +request.url);
  console.log("request.nextUrl.href: " + request.nextUrl.href); 
  console.log("request.nextUrl.pathname: " + request.nextUrl.pathname); 
  console.log("------GET-----");
  
  return NextResponse.redirect(new URL(request.url +"/2024", request.url));
}
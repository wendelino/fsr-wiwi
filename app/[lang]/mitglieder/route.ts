"use server"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname += "/2024";
  return NextResponse.redirect(url);
}
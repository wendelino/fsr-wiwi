 
import db from '@/db/db';
import { NextResponse } from 'next/server'; 

export async function GET() { 
  const locations = await db.location_DB.findMany(); 
  return NextResponse.json(locations);
}
 
//import db from '@/db/db';
import { NextResponse } from 'next/server'; 

export async function GET() {
  const locations = {}
  //const locations = await db.dB_Location.findMany(); 
  return NextResponse.json(locations);
}
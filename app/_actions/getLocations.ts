"use server";
import db from "@/db/db";  
import { Location_DB } from "@prisma/client";


export const getLOCS = async (to: string, html: string, subject: string) => {
  const locations: Location_DB[] = await db.location_DB.findMany();

  return locations;
};

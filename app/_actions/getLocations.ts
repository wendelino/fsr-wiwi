"use server";
import db from "@/db/db"; 
import { DB_Location } from "@prisma/client";


export const sendMail = async (to: string, html: string, subject: string) => {
  const locations: DB_Location[] = await db.dB_Location.findMany();

  return locations;
};

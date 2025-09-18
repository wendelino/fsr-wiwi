"use server";
import { FormFnRes } from "@/components/forms/generic-form";

type POST_Response = {
  msg: string;
  success: boolean;
};

const BASE_URL = `${process.env.CMS_ENDPOINT}/participant/verify`;
const BearerToken = process.env.CMS_TOKEN;

export async function verifyToken(token: string): Promise<FormFnRes> {
  try {
    const response = await fetch(`${BASE_URL}?token=${token}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BearerToken}`,
        "Content-Type": "application/json",
      },
    });

    const data: POST_Response = await response.json();
    return { sx: data.success, msg: data.msg };
  } catch (error) {
    console.error("Error making APId request:", error);
  }
  return { sx: false, msg: `Fehler - API Request fehlgeschlagen` };
}

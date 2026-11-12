import "server-only";
import type { FormFnRes } from "@/components/forms/generic-form";

type GET_Response = {
  msg: string;
  success: boolean;
};

const BASE_URL = `${process.env.CMS_ENDPOINT}/participant/verify`;
const BearerToken = process.env.CMS_TOKEN;

export async function verifyToken(token: string): Promise<FormFnRes> {
  if (!token || token.length > 500) {
    return { sx: false, msg: "Der Bestätigungslink ist ungültig." };
  }
  try {
    const response = await fetch(`${BASE_URL}?token=${encodeURIComponent(token)}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${BearerToken}`,
        "Content-Type": "application/json",
      },
    });

    const data: GET_Response = await response.json();
    return { sx: data.success, msg: data.msg };
  } catch (error) {
    console.error("E-Mail-Bestätigung fehlgeschlagen:", error);
  }
  return { sx: false, msg: "Fehler – API Request fehlgeschlagen" };
}

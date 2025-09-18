"use server";
import { FormFnRes } from "@/components/forms/generic-form";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  eventSlug: string;
  guest: {
    name: string;
    surname: string;
    email: string;
    course: string;
  };
}
type POST_Response = {
  msg: string;
  success: boolean;
};

const BASE_URL = `${process.env.CMS_ENDPOINT}/participant`;
const token = process.env.CMS_TOKEN;

export async function addGuestToEvent({
  eventSlug,
  guest,
}: Props): Promise<FormFnRes> {
  const body = {
    eventSlug,
    guest,
  };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Failed to add guest:", response.statusText);
      return { sx: false, msg: `Fehler - ${response.statusText}` };
    }

    const data: POST_Response = await response.json();

    if (response.ok) {
      console.log("Guest successfully added to event:", data);
      return { sx: true, msg: data.msg };
    } else {
      console.error("Failed to add guest:", data);
    }
  } catch (error) {
    console.error("Error making API request:", error);
  }
  return { sx: false, msg: `Fehler - API Request fehlgeschlagen` };
}

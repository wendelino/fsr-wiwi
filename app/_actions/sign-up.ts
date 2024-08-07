"use server";

interface Props { 
  eventId: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export async function addGuestToEvent({ eventId, guest }: Props) {
  const apiUrl = "https://eventec.vercel.app/api/sign-up"; 
  const apiKey = "your-expected-api-key"

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey, eventId, guest }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Guest successfully added to event:", data);
      return true
    } else {
      console.error("Failed to add guest:", data); 
    }
  } catch (error) {
    console.error("Error making API request:", error);
  }
  return false
}

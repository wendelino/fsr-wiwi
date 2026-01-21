"use server";
const API_ENDPOINT = process.env.EVALUATION_ENDPOINT; 

export async function sendEvaluation(evaluation: {bewertung: string, slug: string}) {
    if (!API_ENDPOINT) {
        throw new Error("EVALUATION_ENDPOINT is not set");
    }
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(evaluation),
        });
    } catch (error) {
        console.error(error);
        return { sx: false, msg: "Fehler beim Senden der Bewertung" };
    }
    return { sx: true, msg: "Bewertung erfolgreich gesendet" };
    }
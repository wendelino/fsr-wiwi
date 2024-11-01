"use server";
 
const token = "dsgjeriz7z3zFEHIEUFHE32784z";

const mailOptions = {
  from: '"FSR Wiwi" <fachschaftsrat@wiwi.uni-halle.de>',
  replyTo: "fachschaftsrat@wiwi.uni-halle.de",
  priority: "high",

  recipient: "wendelin.beddermann@web.de", 
  subject: "Test E-Mai1l", // Subject of the email
  html: "<p>This is the HTML content of the email</p>",
}; 

export interface sendMailProps { 
  name: string;
  to: string;
  subject: string;
  html: string;
  from?: string
}
export async function sendMail({to, name, subject, html, from}: sendMailProps) {

  
  const response = await fetch("https://mailer-api.lnio.de/send-mail", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  
    },
    body: JSON.stringify({...mailOptions, to, name, subject, html, from}),
  });

  const json = await response.json();

  console.log(json);

  return json;
}

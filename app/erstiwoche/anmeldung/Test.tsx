"use client";

import { sendMail } from "@/app/_actions/sendMail";
import { Button } from "@/components/ui/button";

export default function Test() {
  const onSubmit = async () => {
    const to = "jwbklee@icloud.com";
    //const to = "wendelin.beddermann@web.de";
    const html = emailContent(` <h2 style="color: #333333;">Hey Wendelin,</h2><h4 style="color: #333333;">Danke für deine Anmeldung!</h4>
        <p style="color: #555555;">
          Danke, dass Sie sich für unseren Service entschieden haben. Wir freuen
          uns, Sie an Bord zu haben.
        </p>
        <p style="color: #555555;">
          Mit freundlichen Grüßen,
          <br />
          Ihr Team
        </p>`);
    await sendMail(to, html, "Bestätigung");
  };

  return <Button onClick={onSubmit}>Glick mich diggi</Button>;
}


function emailContent(content: string) {
  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body,
      html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: Arial;
        background-color: #dddddd;
      }

      .content {
        max-width: 512px;
        padding: 16px;
        margin: 16px auto;
        border-radius: 16px; 
      }
      main {
        background-color: #ffffff;
      }
      footer {
        background-color: #ffffff50;
        font-size: 0.9rem;
      } 
    </style>
  </head>
  <body>
    <main class="content"> 
      <div style="text-align: center;"> 
        <img src="https://fsr-wiwi.vercel.app/logo.png" alt="Logo" style="width: 128px; height: 128px;" />
      </div>
      ${content}
    </main>
    <footer class="content">
      Fachschaftsrat des wirtschaftswissenschaftlichen Bereichs der Juristischen und Wirtschaftswissenschaftlichen Fakultät <br />
      <br />Grosse Steinstrasse 73<br />
      06108 Halle (Saale)<br /> <br />
      fachschaftsrat@wiwi.uni-halle.de<br /> 
    </footer>
  </body>
</html>`
}
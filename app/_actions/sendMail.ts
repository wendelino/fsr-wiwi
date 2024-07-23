"use server";
import nodemailer from "nodemailer";

const smtpConfig = {
  host: "smtp.ionos.de",
  port: 587, //465
  secure: false, // true für 465, false für andere Ports
  //name: "FSR Wiwi",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export const sendMail = async (to: string, html: string, subject: string) => {
  console.log("sending email...");
  console.log("process.env.SMTP_USER");
  console.log(process.env.SMTP_USER);

  const transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: `"FSR Wiwi" <${smtpConfig.auth.user}>`,
    to: to,
    subject: subject,
    html: emailContent(html),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true }
  } catch (error) {
    console.log(error);
    return { success: false }
  }
};
 


function emailContent(content: string) {
  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style> 
      html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: Arial;
        background-color: #dddddd;
      }
      body {
        margin: 0;
        padding: 16px;  
      }

      .content {
        max-width: 512px;
        padding: 16px;
        margin: 0 auto;
        border-radius: 16px; 
      }
      main {
        background-color: #ffffff;
      }
      footer { 
        background-color: #eeeeee;
        font-size: 0.9rem;
      } 
    </style>
  </head>
  <body style=" padding: 16px">
    <main class="content"> 
      <div style="text-align: center;"> 
        <img src="https://fsr-wiwi.vercel.app/logo.png" alt="Logo" style="width: 128px; height: 128px;" />
      </div>
      ${content}
      <br /><br /> 
      <footer class="content">
        Fachschaftsrat des wirtschaftswissenschaftlichen Bereichs der Juristischen und Wirtschaftswissenschaftlichen Fakultät <br />
        <br />Grosse Steinstrasse 73<br />
        06108 Halle (Saale)<br /> <br />
        fachschaftsrat@wiwi.uni-halle.de<br /> 
      </footer>
    </main> 
  </body>
</html>`
}
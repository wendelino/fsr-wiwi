export default function base_template(content: string) {  
        const logoBase64 = `data:image/png;base64,/YOUR_BASE64_LOGO_HERE`; // Hier muss der tatsächliche Base64-String des Logos eingefügt werden
      
        return `<!DOCTYPE html>
      <html lang="de">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>FSR WiWi Newsletter</title>
          <!--[if mso]>
          <noscript>
              <xml>
                  <o:OfficeDocumentSettings>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
              </xml>
          </noscript>
          <![endif]-->
          <style>
              /* Reset styles */
              body, html {
                  margin: 0 !important;
                  padding: 0 !important;
                  height: 100% !important;
                  width: 100% !important;
                  font-family: Arial, Helvetica, sans-serif !important;
                  -webkit-text-size-adjust: 100% !important;
                  -ms-text-size-adjust: 100% !important;
                  background-color: #ffffff !important;
              }
              
              /* Base container */
              .email-container {
                  max-width: 600px !important;
                  margin: 0 auto !important; 
              }
              
              /* Main content */
              .content-wrapper { 
                  padding: 24px !important;
                  margin: 16px !important;
                  border-radius: 8px !important;
              }
              
              /* Logo container */
              .logo-container {
                  text-align: center !important;
                  padding: 16px 0 !important;
              }
              
              .logo {
                  width: 128px !important;
                  height: 128px !important;
                  max-width: 100% !important;
                  display: inline-block !important;
              }
              
              /* Footer styles */
              .footer {
                  background-color: #eeeeee !important;
                  padding: 16px !important; 
                  border-radius: 8px !important;
                  font-size: 14px !important;
                  color: #4C4C4C !important;
                  line-height: 1.5 !important;
              }
              
              /* Responsive styles */
              @media screen and (max-width: 600px) {
                  .content-wrapper, .footer {
                      margin: 8px !important;
                      padding: 16px !important;
                  }
                  
                  .email-container {
                      width: 100% !important;
                      margin: 0 !important;
                  }
              }
          </style>
      </head>
      <body>
          <!--[if mso]>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td align="center">
          <![endif]-->
          
          <div class="email-container">
              <div class="content-wrapper">
                  <div class="logo-container">
                      <img class="logo" src="https://fsr-wiwi.vercel.app/logo.png" alt="FSR WiWi Logo" />
                  </div>
                  
                  ${content}
                  
                  <div class="footer">
                      <strong>Fachschaftsrat des wirtschaftswissenschaftlichen Bereichs</strong><br />
                      der Juristischen und Wirtschaftswissenschaftlichen Fakultät<br />
                      <br />
                      Grosse Steinstrasse 73<br />
                      06108 Halle (Saale)<br />
                      <br />
                      <a href="mailto:fachschaftsrat@wiwi.uni-halle.de">fachschaftsrat@wiwi.uni-halle.de</a>
                  </div>
              </div>
          </div>
          
          <!--[if mso]>
          </td></tr>
          </table>
          <![endif]-->
      </body>
      </html>`;
      }
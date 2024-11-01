interface EmailTemplateProps {
    name: string;
    message: string;
  }
  
  export default function message_user({ name, message }: EmailTemplateProps) {
    return `
      <html>
        <body>
          <h1>Hallo ${name},</h1>
          <p>${message}</p>
          <p>Mit freundlichen Grüßen,<br />Dein Team</p>
        </body>
      </html>
    `;
  };
  
  
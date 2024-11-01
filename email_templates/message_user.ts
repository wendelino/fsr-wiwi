import base_template from "./base_template";

interface message_userProps {
    name: string;
    message: string;
  }
  
  export function message_user({ name, message }: message_userProps) {
    return base_template(`
     <div>
            <h1>Hallo ${name},</h1>
            <p>Vielen Dank für deine Nachricht :)<br /><br /> 
            Wir werden uns so schnell wie möglich bei dir melden! </p> 
            <h4>Deine Nachricht:</h4>
            <p>${message}</p> 
            <br /><br /> 

            Liebe Grüße<br /> 
            <bold>Dein FSR Wiwi</bold>
             <3
            <br /><br />  
            <light>Diese Nachricht wurde automatisch erstellt am ${new Date().toLocaleString()}</light>
 
          </div>
          `);
  }
  
  
  
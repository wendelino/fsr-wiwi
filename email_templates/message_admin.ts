import base_template from "./base_template";

interface message_userProps {
  name: string;
  message: string;
  email: string;
}

export function message_admin({ name, message, email }: message_userProps) { 
  return base_template(`
         <div>
            <h1>Neue Anfrage von ${name}</h1> 
            <p>${message}</p> 

           <br /><br /> ${name} <br /> 
           <a href="mailto:${email}">${email}</a> 
           <br /><br />   </div>
          `);
}

import { toast } from "sonner";

require('dotenv').config();

type mailObject = {
    name: string;
    email: string;
    message: string;
  };


export async function sendEmail(email:string, name: string, message: string) {
  const apiEndpoint = '/api/v2/email';

  const mailingObject:mailObject = {
    email:email,
    name: name,
    message: message
  }

  await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(mailingObject),
  })
    .then((res) => res.json())
    .then((response) => {
      toast.success(`${response.message}`);
    })
    .catch((err) => {
      toast.error(`Error in sendmail function catch try http request ${err}`);
    });
}
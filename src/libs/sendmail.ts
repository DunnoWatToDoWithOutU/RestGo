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
      alert(`Error in sendmail function parsing response to json${response.message}`);
    })
    .catch((err) => {
      alert(`Error in sendmail function catch try http request ${err}`);
    });
}
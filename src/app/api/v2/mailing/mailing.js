import fs from 'fs';
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://mail.google.com/',
'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send' // Add this scope
  ];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/public/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function googleAuthorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

  async function getRecentMessages() {
    try {
      const auth = await authorize(); // Get the auth object
      const gmail = google.gmail({ version: 'v1', auth }); // Initialize gmail with auth

      const res = await gmail.users.messages.list({ // Inside the async function
        userId: 'me',
        maxResults: 2
      });

      const messages = res.data.messages;

      for (const message of messages) {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id
        });
        // console.log(JSON.stringify(msg.data, null, 2));

        // const subject = msg.data.payload.headers.find(header => header.name === 'Subject')?.value;
        // console.log(subject);
        // console.log(`Subject: ${msg.data}`);
      }

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

   export async function sendMessage(sender, recipient, subject, body) {
    try {
      const auth = await authorize(); // Get your authorization object
      const gmail = google.gmail({ version: 'v1', auth });

      // Construct the email
      const emailLines = [
        `From: ${sender}`,
        `To: ${recipient}`,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        body
      ];
      const email = emailLines.join('\r\n').trim();

      // Encode as base64
      const base64Email = Buffer.from(email).toString('base64');

      // Send the email
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: base64Email
        }
      });

      console.log('Email sent successfully!');

    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

// authorize().then(sendMessage('nattapon.how@gmail.com', 'gobgab.ingfah@gmail.com', 'HI there', ' hi')).catch(console.error);
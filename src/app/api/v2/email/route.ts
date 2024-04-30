import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
require('dotenv').config();

/**
 * @swagger
 * /api/v2/email:
 *   post:
 *     description: Send the response email
 *     tags: [Response Email]
 *     response:
 *       500:
 *         description: Failed to send response email
 */

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.NEXT_PUBLIC_REST_GO_EMAIL,
      pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_REST_GO_EMAIL,
    to: email,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    html: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Booking Successful');
          console.log('Email sent')
        } else {
          console.log(err.message)
          reject(err.message);
        }
      });
    });

  try {
    console.log(process.env.NEXT_PUBLIC_REST_GO_EMAIL)
    console.log(process.env.NEXT_PUBLIC_APP_PASSWORD)
    await sendMailPromise();
    return NextResponse.json({ message: 'Booking Successful' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
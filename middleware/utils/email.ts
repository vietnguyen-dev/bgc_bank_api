import nodemailer from "nodemailer";
import { Request, Response } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

export const sendConfirmEmail = async (code: string, email: string) => { 
    try {
        const transportOptions = { 
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        }
        const transporter = nodemailer.createTransport(transportOptions);
        
        const mailOptions = {
            from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER_NAME}>`,
            to: `${email}`,
            subject: `Confirmation Code`,
            text: `Hello `,
            html: 
            `<p>Hello</p>
            <p>Your confirmation code is ${code}</p>
            <br/>
            <br/>
            <p>Much Thanks, </p>
            <p>The team at BGC Club Bucks App Support</p></p>
            `,
          }
        const info = await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error(err, 'from sendEmailToSseeller')
    }   
}
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const toEmail = 'yashjosh7486@gmail.com';

    const subject = `New contact form submission from ${name}`;
    const textContent = `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const htmlContent = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${message}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      subject,
      text: textContent,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}



/**
 * Email Service
 *
 * Handles sending transactional emails via Resend.
 * Uses custom HTML templates matching the rebranding design system.
 */

import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  product?: string;
}

/**
 * Sends a notification email to the admin and a confirmation email to the customer.
 */
export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const adminEmail = process.env.EMAIL_TO_ADMIN || 'info@aonedigitalindia.com';
  const fromEmail = process.env.EMAIL_FROM || 'info@aonedigitalindia.com';

  // 1. Notify Admin of new lead
  await resend.emails.send({
    from: `Aone Digital India <noreply@aonedigitalindia.com>`,
    to: [adminEmail],
    subject: `📥 New Customer Inquiry: ${data.subject}`,
    reply_to: data.email,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Customer Inquiry</title>
        <style>
          body {
            font-family: 'Plus Jakarta Sans', Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            font-family: 'Libre Caslon Text', Georgia, serif;
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 24px;
            border-bottom: 2px solid #eff6ff;
            padding-bottom: 16px;
          }
          .field {
            margin-bottom: 16px;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            margin-bottom: 4px;
            font-weight: 700;
          }
          .value {
            font-size: 16px;
            color: #0f172a;
          }
          .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            border-radius: 0 8px 8px 0;
            margin-top: 8px;
            font-style: italic;
          }
          .footer {
            margin-top: 32px;
            font-size: 12px;
            color: #94a3b8;
            text-align: center;
            border-top: 1px solid #f1f5f9;
            padding-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">📥 New Customer Inquiry</div>
          
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>

          ${data.product ? `
          <div class="field">
            <div class="label">Interested Product</div>
            <div class="value">${data.product}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${data.subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            Sent automatically by Aone Digital India CRM.
          </div>
        </div>
      </body>
      </html>
    `,
  });

  // 2. Confirm to Customer
  await resend.emails.send({
    from: `Aone Digital India <${fromEmail}>`,
    to: [data.email],
    subject: `We received your message — Aone Digital India`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Contacting Us</title>
        <style>
          body {
            font-family: 'Plus Jakarta Sans', Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            font-family: 'Libre Caslon Text', Georgia, serif;
            font-size: 22px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 20px;
            text-align: center;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            margin-bottom: 24px;
          }
          .cta-box {
            text-align: center;
            margin: 32px 0;
          }
          .btn {
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            display: inline-block;
          }
          .footer {
            margin-top: 32px;
            font-size: 12px;
            color: #94a3b8;
            text-align: center;
            border-top: 1px solid #f1f5f9;
            padding-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Thank you for getting in touch!</div>
          
          <div class="content">
            <p>Hello ${data.name},</p>
            <p>We have successfully received your message regarding "<strong>${data.subject}</strong>". One of our product advisors will review it and get back to you within 24 hours.</p>
            <p>In the meantime, you can explore our latest offers on smartphones and home appliances directly on our website.</p>
          </div>
          
          <div class="cta-box">
            <a href="https://www.aonedigitalindia.com/offers" class="btn">View Latest Offers</a>
          </div>
          
          <div class="content">
            <p>Best regards,<br><strong>Aone Digital India Team</strong></p>
          </div>
          
          <div class="footer">
            This is an automated confirmation of your inquiry.<br>
            Aone Digital India | support@aonedigitalindia.com
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

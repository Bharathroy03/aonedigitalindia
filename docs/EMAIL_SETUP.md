# 📧 Email Setup — Aone Digital India

> Configuration guide for transactional email setup using Resend and React Email.

---

## 📋 Table of Contents

- [Email Provider](#email-provider)
- [Environment Setup](#environment-setup)
- [Email Templates](#email-templates)
- [Contact Form Email](#contact-form-email)
- [Lead Notification Email](#lead-notification-email)
- [Testing Emails](#testing-emails)
- [Troubleshooting](#troubleshooting)

---

## 📮 Email Provider

**Primary:** [Resend](https://resend.com) — Modern email API built for developers  
**Alternative:** Nodemailer + Gmail / SMTP

### Why Resend?

- Simple API, great developer experience
- Excellent deliverability
- React Email template support
- Free tier: 3,000 emails/month

---

## 🔐 Environment Setup

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=info@aonedigitalindia.com
EMAIL_REPLY_TO=info@aonedigitalindia.com
EMAIL_TO_ADMIN=info@aonedigitalindia.com
EMAIL_TO_SUPPORT=support@aonedigitalindia.com
```

### Installation

```bash
npm install resend @react-email/components
```

---

## 📄 Email Templates

Templates are stored in `emails/` directory using React Email:

```
emails/
├── ContactNotification.tsx     # Notify admin of new inquiry
├── ContactConfirmation.tsx     # Confirm receipt to customer
├── NewsletterWelcome.tsx       # Welcome new subscriber
└── layouts/
    └── BaseEmailLayout.tsx     # Shared email layout
```

---

## 📩 Contact Form Email

### Service Implementation

```ts
// services/email.service.ts
import { Resend } from 'resend';
import ContactNotification from '@/emails/ContactNotification';
import ContactConfirmation from '@/emails/ContactConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  // 1. Notify admin
  await resend.emails.send({
    from: 'Aone Digital India <noreply@aonedigitalindia.com>',
    to: [process.env.EMAIL_TO_ADMIN!],
    subject: `New Inquiry: ${data.subject}`,
    react: ContactNotification({ ...data }),
    replyTo: data.email,
  });

  // 2. Confirm to customer
  await resend.emails.send({
    from: 'Aone Digital India <info@aonedigitalindia.com>',
    to: [data.email],
    subject: 'We received your message — Aone Digital India',
    react: ContactConfirmation({ name: data.name }),
  });
}
```

---

## 📋 Lead Notification Email Template

```tsx
// emails/ContactNotification.tsx
import {
  Body, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Section, Text
} from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactNotification({
  name, email, phone, subject, message
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New inquiry from {name}: {subject}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            📥 New Customer Inquiry
          </Heading>
          <Hr />
          <Section>
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Phone:</strong> {phone}</Text>
            <Text><strong>Subject:</strong> {subject}</Text>
            <Hr />
            <Text><strong>Message:</strong></Text>
            <Text>{message}</Text>
          </Section>
          <Hr />
          <Text style={footerStyle}>
            Aone Digital India | info@aonedigitalindia.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = { backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' };
const containerStyle = { maxWidth: '600px', margin: '0 auto', padding: '24px', backgroundColor: '#fff' };
const headingStyle = { color: '#1e3a8a', fontSize: '24px' };
const footerStyle = { color: '#94a3b8', fontSize: '12px' };
```

---

## 🧪 Testing Emails

```bash
# Use Resend's test mode (emails go to your dashboard, not real inboxes)
RESEND_API_KEY=re_test_xxxxx

# Or use a test inbox service
# - Mailtrap: https://mailtrap.io
# - Ethereal: https://ethereal.email
```

---

## 🐛 Troubleshooting

### Email Not Sending

1. Verify `RESEND_API_KEY` is set in `.env.local`
2. Check Resend dashboard for delivery logs
3. Verify `from` domain is verified in Resend

### Emails Going to Spam

1. Set up SPF, DKIM, DMARC records for your domain
2. Warm up sending volume gradually
3. Avoid spam trigger words in subject lines

### Domain Verification

Add these DNS records to `aonedigitalindia.com`:

| Type | Name | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:resend.com ~all` |
| TXT | resend._domainkey | (provided by Resend) |
| TXT | @ | `v=DMARC1; p=quarantine` |

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team

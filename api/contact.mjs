// api/contact.mjs — Vercel serverless function
// Endpoint: POST /api/contact
// Receives form submission, creates contact in GHL, sends confirmation + notification emails.
//
// Required Vercel env vars: GHL_TOKEN, GHL_LOCATION_ID, GHL_NOTIFICATION_EMAIL

import { handleSubmission } from '../scripts/ghl.mjs';

// Spam control — form submissions from these countries are rejected.
// ISO 3166-1 alpha-2 codes; add/remove codes here as needed.
const BLOCKED_COUNTRIES = new Set(['IN', 'PK', 'IR']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Vercel sets this header from the request IP; it can't be spoofed by the client.
  const country = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
  if (BLOCKED_COUNTRIES.has(country)) {
    console.warn('[/api/contact] blocked submission from', country);
    res.status(403).json({ error: 'We are unable to accept inquiries from your region.' });
    return;
  }

  if (!process.env.GHL_TOKEN || !process.env.GHL_LOCATION_ID) {
    res.status(500).json({ error: 'Server misconfigured: GHL credentials not set' });
    return;
  }

  try {
    // Vercel auto-parses JSON if Content-Type is application/json
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const result = await handleSubmission(data);
    res.status(200).json(result);
  } catch (err) {
    console.error('[/api/contact] error:', err.message);
    if (err.body) console.error('  GHL body:', JSON.stringify(err.body));
    res.status(err.status || 500).json({ error: err.message });
  }
}

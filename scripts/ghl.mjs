// ghl.mjs — GoHighLevel API helpers (Private Integration v2)
// Used by serve.mjs (local) and api/contact.mjs (Vercel) — both call these functions.

const GHL_BASE = 'https://services.leadconnectorhq.com';

async function ghlFetch(path, options = {}) {
  const url = `${GHL_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${process.env.GHL_TOKEN}`,
      'Version': '2021-07-28',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch {}
  if (!res.ok) {
    const err = new Error(`GHL API ${res.status} on ${path}: ${text || res.statusText}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export async function upsertContact({
  firstName,
  lastName,
  email,
  phone,
  tags = [],
  source = 'Website',
  customFields = [],
}) {
  const body = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    phone,
    tags,
    source,
    customFields,
  };
  // Strip empty values — GHL is picky about empty strings on some fields.
  for (const k of Object.keys(body)) {
    const v = body[k];
    if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) delete body[k];
  }
  const result = await ghlFetch('/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return result.contact || result;
}

export async function sendEmail({ contactId, subject, html, emailFrom }) {
  const body = {
    type: 'Email',
    contactId,
    subject,
    html,
  };
  if (emailFrom) body.emailFrom = emailFrom;
  return ghlFetch('/conversations/messages', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// ---- Email templates (inline, brand-styled) ----

const BRAND = {
  green: '#2c573d',
  brown: '#a07d67',
  brownDark: '#342319',
  beige: '#c3b49d',
  linen: '#f0ece4',
  ink: '#1a1614',
};

export function visitorConfirmationHTML({ firstName }) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${BRAND.linen};font-family:Georgia,serif;color:${BRAND.ink};">
<div style="max-width:560px;margin:0 auto;background:#fff;padding:48px 40px;">
  <div style="text-align:center;border-bottom:1px solid ${BRAND.beige};padding-bottom:24px;margin-bottom:32px;">
    <div style="font-family:Georgia,serif;font-size:24px;color:${BRAND.green};letter-spacing:1px;">CHASE CONSTRUCTION</div>
    <div style="font-family:Georgia,serif;font-size:11px;color:${BRAND.brown};letter-spacing:2px;margin-top:4px;">SUN VALLEY, IDAHO</div>
  </div>
  <p style="font-size:17px;line-height:1.6;margin:0 0 20px;">Hi ${firstName || 'there'},</p>
  <p style="font-size:16px;line-height:1.7;margin:0 0 20px;">Thank you for reaching out. We received your inquiry and Mike will personally review it in the next 24&ndash;48 hours.</p>
  <p style="font-size:16px;line-height:1.7;margin:0 0 20px;">When we respond, we'll either set up a first conversation about your project, or tell you honestly if we're not the right builder for what you have in mind.</p>
  <p style="font-size:16px;line-height:1.7;margin:0 0 32px;">No pressure. No hard sell.</p>
  <p style="font-size:16px;line-height:1.7;margin:0 0 8px;">In the meantime, if it's urgent:</p>
  <p style="font-size:16px;line-height:1.7;margin:0 0 32px;"><a href="tel:2088978100" style="color:${BRAND.green};text-decoration:none;font-weight:bold;">208-897-8100</a></p>
  <div style="border-top:1px solid ${BRAND.beige};padding-top:24px;font-size:13px;color:${BRAND.brown};line-height:1.6;">
    <div>Chase Construction LLC</div>
    <div>Bellevue, Idaho &middot; Serving Sun Valley, Ketchum &amp; Hailey</div>
    <div style="margin-top:8px;"><a href="https://www.chaseconstruction.org" style="color:${BRAND.brown};">www.chaseconstruction.org</a></div>
  </div>
</div>
</body></html>`;
}

export function ownerNotificationHTML(formData) {
  const { name, email, phone, location, project, referral } = formData;
  const row = (label, value) => value
    ? `<tr><td style="padding:8px 16px 8px 0;color:${BRAND.brown};font-size:13px;vertical-align:top;width:140px;">${label}</td><td style="padding:8px 0;font-size:14px;color:${BRAND.ink};">${escapeHtml(value)}</td></tr>`
    : '';
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${BRAND.linen};font-family:Georgia,serif;color:${BRAND.ink};">
<div style="max-width:600px;margin:0 auto;background:#fff;padding:40px;">
  <div style="border-bottom:2px solid ${BRAND.green};padding-bottom:16px;margin-bottom:24px;">
    <div style="font-family:Georgia,serif;font-size:22px;color:${BRAND.green};">New Website Inquiry</div>
    <div style="font-size:13px;color:${BRAND.brown};margin-top:4px;">Submitted via chaseconstruction.org contact form</div>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    ${row('Name', name)}
    ${row('Email', email)}
    ${row('Phone', phone)}
    ${row('Location', location)}
    ${row('Referral', referral)}
  </table>
  ${project ? `<div style="background:${BRAND.linen};padding:20px;border-left:3px solid ${BRAND.green};margin-bottom:24px;">
    <div style="font-size:13px;color:${BRAND.brown};margin-bottom:8px;">Project description</div>
    <div style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(project)}</div>
  </div>` : ''}
  <div style="border-top:1px solid ${BRAND.beige};padding-top:16px;font-size:12px;color:${BRAND.brown};">
    The contact is now in your GHL workspace under tag <code style="background:${BRAND.linen};padding:2px 6px;">website-inquiry</code>.
  </div>
</div>
</body></html>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---- Main submission handler ----

export async function handleSubmission(formData) {
  const { name = '', email, phone = '', location = '', project = '', referral = '' } = formData;
  if (!email) throw new Error('Email is required');

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] || 'Visitor';
  const lastName = nameParts.slice(1).join(' ') || '';

  // 1. Upsert visitor contact in GHL
  const visitor = await upsertContact({
    firstName, lastName, email, phone,
    tags: ['website-inquiry'],
    source: 'Chase Construction Website',
    customFields: [
      location && { key: 'property_location', field_value: location },
      referral && { key: 'referral_source', field_value: referral },
      project && { key: 'project_description', field_value: project },
    ].filter(Boolean),
  });

  const visitorId = visitor.id;
  if (!visitorId) throw new Error('Failed to obtain visitor contact ID from GHL');

  // 2. Send confirmation to visitor
  await sendEmail({
    contactId: visitorId,
    subject: 'Thanks for reaching out — Chase Construction',
    html: visitorConfirmationHTML({ firstName }),
  });

  // 3. Upsert owner contact + send notification email
  const ownerEmail = process.env.GHL_NOTIFICATION_EMAIL;
  if (ownerEmail) {
    const owner = await upsertContact({
      firstName: 'Site',
      lastName: 'Notifications',
      email: ownerEmail,
      tags: ['site-notifications'],
      source: 'Internal',
    });
    if (owner.id) {
      await sendEmail({
        contactId: owner.id,
        subject: `New website inquiry — ${name || email}`,
        html: ownerNotificationHTML({ name, email, phone, location, project, referral }),
      });
    }
  }

  return { success: true, contactId: visitorId };
}

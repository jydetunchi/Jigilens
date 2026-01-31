exports.handler = async function(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Allow': 'POST, OPTIONS' },
      body: 'Method Not Allowed'
    };
  }

  const parseBody = (body, headers) => {
    const ct = headers['content-type'] || headers['Content-Type'] || '';
    if (ct.includes('application/json')) return JSON.parse(body);
    if (ct.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(body);
      const obj = {};
      for (const [k, v] of params) obj[k] = v;
      return obj;
    }
    return {};
  };

  let data;
  try {
    data = parseBody(event.body || '', event.headers || {});
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const message = (data.message || '').trim();
  const company = (data.company || '').trim(); // honeypot

  // Honeypot spam check
  if (company) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Spam detected' })
    };
  }

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Missing required fields' })
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid email address' })
    };
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'jiggilens@gmail.com';

  if (!SENDGRID_API_KEY) {
    // Fail-open for dev: log and return success-ish to avoid exposing API key misconfiguration to users
    console.error('SENDGRID_API_KEY not configured');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Server not configured' })
    };
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL }],
        subject: `Website Inquiry from ${name}`
      }
    ],
    from: { email: 'no-reply@jiggylens.com', name: 'JIGGY LENS Website' },
    reply_to: { email, name },
    content: [
      {
        type: 'text/plain',
        value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      }
    ]
  };

  try {
    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('SendGrid error', resp.status, text);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Email service error', details: text })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error('Handler error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};

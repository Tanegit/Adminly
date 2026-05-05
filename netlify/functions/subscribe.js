const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER = process.env.MAILCHIMP_SERVER;

  const response = await fetch(`https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('anystring:' + API_KEY).toString('base64'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email_address: email, status: 'subscribed' })
  });

  const data = await response.json();

  if (response.ok) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } else {
    return { statusCode: 200, body: JSON.stringify({ success: false, error: data.title }) };
  }
};

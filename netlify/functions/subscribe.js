exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  const params = new URLSearchParams({
    EMAIL: email,
    u: '2b4eef47099c1f6f83ee13f46',
    id: '841bcbcfe7',
    f_id: '00b591e3f0'
  });

  const response = await fetch('https://gmail.us2.list-manage.com/subscribe/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (response.ok) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } else {
    return { statusCode: 200, body: JSON.stringify({ success: false, error: 'Subscription failed' }) };
  }
};

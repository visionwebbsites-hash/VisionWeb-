export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const pixelId = '2177886426121813';
  const token = 'EABAZAUbPOZBswBSnKC5QObpJr8p-NZB5MrqRPb6bMIgATFLNJ3eSuGt5jp-SwwiJtQk3BLjncVMqgr4kdF220qSot6-pifTN0t7aZAJ2erBByZCmul4yeTX-Brxgy6KFLYyP1FK96hwmMjCCLkRU-ZASIMY5w7iJK75q4bILI6jJN2uPqijh-ZA45fwBw5m97QxDvQiAZDZD';

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: req.body.eventName || 'PageView',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: req.body.url,
            user_data: {
              client_ip_address: req.headers['x-forwarded-for'] || '',
              client_user_agent: req.headers['user-agent'] || '',
            },
          },
        ],
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

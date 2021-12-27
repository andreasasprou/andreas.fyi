import { NextApiRequest, NextApiResponse } from 'next';
import { ServerConstants } from '../../shared/constants/server';

async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const LIST_ID = ServerConstants.mailchimp.listId;

  const response = await fetch(
    `https://us7.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      body: JSON.stringify({
        email_address: JSON.parse(req.body).email,
        status: 'subscribed',
      }),
      headers: {
        Authorization: `apikey ${ServerConstants.mailchimp.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  ).then((res) => res.json());

  if (response.status >= 400 && response.title !== 'Member Exists') {
    console.log(response);

    res.status(500).json({
      message:
        "Hm, couldn't add you to the newsletter - ping me directly at andyasprou@gmail.com and I'll add you to this list!",
    });
    return;
  }

  res.status(200).end();
}

export default subscribe;

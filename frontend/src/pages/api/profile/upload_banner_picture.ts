import parseCookies from '@/utils/cookies/parseCookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';

type Data = {
  name?: string;
  error?: string;
};

async function getRawBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', reject);
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const accessToken = cookies.access;

  if (!accessToken) {
    return res.status(401).json({ error: 'User unauthorized to make this request' });
  }

  try {
    const rawBody = await getRawBody(req);

    const apiRes = await fetch(`${process.env.API_URL}/api/profile/upload_banner_picture/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${accessToken}`,
        'Content-Type': req.headers['content-type'] || 'multipart/form-data', // Pass the original content type
      },
      body: rawBody,
    });

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: 'Something went wrong in the API route' });
  }
}

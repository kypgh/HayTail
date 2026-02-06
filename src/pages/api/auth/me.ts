import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionCookie = req.cookies.session

  if (!sessionCookie) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const session = JSON.parse(sessionCookie)
    return res.status(200).json({ 
      user: {
        inGameName: session.inGameName,
        hytaleUsername: session.hytaleUsername
      }
    })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid session' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyUsername } from '@/lib/db'
import { serialize } from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { username } = req.body

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    const player = await verifyUsername(username.trim())

    if (!player) {
      return res.status(404).json({ 
        error: 'Account not found. Please link your account in-game first using /link' 
      })
    }

    // Set session cookie (expires when browser closes)
    const cookie = serialize('session', JSON.stringify({
      inGameName: player.in_game_name,
      hytaleUsername: player.hytale_username,
      hytaleUuid: player.hytale_uuid
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ 
      success: true,
      user: {
        inGameName: player.in_game_name,
        hytaleUsername: player.hytale_username
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

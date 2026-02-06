import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
  }
  return pool
}

export async function verifyUsername(inGameName: string) {
  const pool = getPool()
  const [rows] = await pool.execute(
    'SELECT in_game_name, hytale_username, hytale_uuid FROM player_links WHERE in_game_name = ?',
    [inGameName]
  )
  
  const results = rows as any[]
  return results.length > 0 ? results[0] : null
}

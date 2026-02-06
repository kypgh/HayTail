import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    const config = {
      host: process.env.DB_HOST || 'ms3698.gamedata.io',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'ni12612013_1_DB',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'ni12612013_1_DB',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }
    
    // Log config (without password) for debugging
    console.log('MySQL Config:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      hasPassword: !!config.password
    })
    
    pool = mysql.createPool(config)
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

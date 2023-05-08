import pg from 'pg'

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const db = new pg.Pool();

pg.defaults.parseInt8 = true

export default db
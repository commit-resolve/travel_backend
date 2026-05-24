require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
async function testDB() {

  try {

    const res = await pool.query('SELECT NOW()');

    console.log('✅ PostgreSQL connected');

    console.log(res.rows[0]);

  } catch (err) {

    console.error('❌ Connection failed');

    console.error(err.message);

  }

}

testDB();
module.exports = pool;

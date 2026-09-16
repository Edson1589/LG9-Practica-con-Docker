const { Pool } = require("pg");

// Configuración de la conexión con PostgreSQL.
// Todos los valores importantes vienen de variables de entorno.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

// Endpoint GET /health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Endpoint GET /users
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

module.exports = pool;
const express = require("express");
const app = express();

const usersRoutes = require('./routes/users');

const PORT = Number(process.env.API_PORT) || 3000;

// Permite recibir JSON en las peticiones.
app.use(express.json());

app.use('./routes/users.js', usersRoutes);

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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


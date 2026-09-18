require('dotenv').config();
const express = require("express");
const app = express();
const { initializeDatabase } = require("./config/db")
const usersRoutes = require('./routes/users.routes');

const PORT = Number(process.env.API_PORT) || 3000;

// Permite recibir JSON en las peticiones.
app.use(express.json());

app.use('/users', usersRoutes);

// Endpoint GET /health
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Conecta e nicializa PostgreSQL y despues inicia Express
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`API ejecutandose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No fue posible iniciar la API:", error);
    process.exit(1);
  }
}

startServer();


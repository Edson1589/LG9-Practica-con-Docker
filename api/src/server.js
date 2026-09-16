const express = require("express");
const { Pool } = require("pg");

const app = express();

const PORT = process.env.API_PORT || 3000;

// Permite recibir JSON en las peticiones.
app.use(express.json());

// Configuración de la conexión con PostgreSQL.
// Todos los valores importantes vienen de variables de entorno.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

// Endpoint para comprobar que la API está funcionando.
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

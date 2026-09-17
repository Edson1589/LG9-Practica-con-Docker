const { Pool } = require("pg");
require("dotenv").config();

// Configuración de la conexión con PostgreSQL.
// Todos los valores importantes vienen de variables de entorno.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

module.exports = pool;
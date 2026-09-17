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

// Crear la tabla users si todavia no existe
async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `);

  console.log("Base de datos inicializada correctamente.")
}

module.exports = {
  pool,
  initializeDatabase
};
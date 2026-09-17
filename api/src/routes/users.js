const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Endpoint GET /users - Obtiene todos los usuarios almacenados en PostgreSQL
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios", error);

    res.status(500).json({
      error: 'Error al consultar usuarios'
    });
  }
});

// Endpoint POST /users - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Los campos name y email son obligatorios"
      });
    }

    const result = await pool.query(
      `
          INSERT INTO users (name, email)
          VALUES ($1, $2)
          RETURNING id, name, email
        `,
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;
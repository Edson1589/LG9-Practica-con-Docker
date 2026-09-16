const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Endpoint GET /users
router.get('/users', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

// POST /users - Crear un usuario
router.post('/', async (req, res) => {
    try {
      const { name, email } = req.body;
  
      // Validar que lleguen los datos
      if (!name || !email) {
        return res.status(400).json({ error: 'Los campos name y email son obligatorios' });
      }
  
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      // 23505 = el email ya existe (si la columna es UNIQUE)
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;
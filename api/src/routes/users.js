const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Endpoint GET /health
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Endpoint GET /users
router.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

module.exports = router;
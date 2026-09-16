const express = require("express");
const app = express();

const usersRoutes = require('./routes/users');

const PORT = Number(process.env.API_PORT) || 3000;

// Permite recibir JSON en las peticiones.
app.use(express.json());

app.use('./routes/users.js', usersRoutes);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


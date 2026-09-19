# LG9 - Práctica con Docker

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?logo=docker&logoColor=white)

Aplicación REST desarrollada con **Node.js, Express y PostgreSQL**, ejecutada mediante **Docker** y **Docker Compose**.

El proyecto permite crear y consultar usuarios almacenados en PostgreSQL, utilizando comunicación entre contenedores, variables de entorno, volúmenes, redes Docker y healthchecks.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose

## Estructura del proyecto

```text
LG9-Practica-con-Docker/
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   └── users.routes.js
│   │   └── server.js
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── .env
├── .env.example
├── docker-compose.yml
└── README.md
```

## Variables de entorno

El archivo `.env` contiene la configuración utilizada por Docker Compose y la API:

```env
POSTGRES_USER=appuser
POSTGRES_PASSWORD=secret123
POSTGRES_DB=appdb
POSTGRES_PORT=5432
DB_HOST=postgres
API_PORT=3000
```

La API se conecta a PostgreSQL utilizando el nombre del servicio `postgres`, no `localhost`.

## Ejecutar el proyecto

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Para ejecutarlo en segundo plano:

```bash
docker compose up -d --build
```

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Comprobar estado de la API

```http
GET /health
```

Respuesta:

```json
{
  "status": "ok"
}
```

### Obtener usuarios

```http
GET /users
```

### Crear usuario

```http
POST /users
```

Body de ejemplo:

```json
{
  "name": "Juan",
  "email": "juan@example.com"
}
```

## Comandos útiles

```bash
# Ver contenedores
docker ps

# Ver logs
docker compose logs

# Ver logs de la API
docker compose logs api

# Ver logs de PostgreSQL
docker compose logs postgres

# Detener los servicios conservando los datos
docker compose down

# Detener los servicios y eliminar también los volúmenes
docker compose down -v
```

## Persistencia

PostgreSQL utiliza un volumen Docker para conservar los datos.

Al ejecutar:

```bash
docker compose down
```

los usuarios almacenados permanecen disponibles al volver a iniciar el proyecto.

Para eliminar también los datos persistidos:

```bash
docker compose down -v
```

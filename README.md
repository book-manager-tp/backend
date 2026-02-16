# Book Manager - Backend

Este proyecto es una aplicacion backend que permite gestionar libros y categorias con autenticacion de usuarios. Incluye autenticacion con JWT, base de datos MySQL con Sequelize ORM y arquitectura en capas.

## Descripcion

Book Manager Backend es una API REST donde los usuarios pueden registrarse, iniciar sesion y gestionar una biblioteca de libros. Los usuarios autenticados pueden crear, editar y eliminar sus propios libros, mientras que cualquier usuario puede consultar el catalogo completo y las categorias disponibles. El sistema incluye verificacion de email.

## Instalacion y ejecucion

### Requisitos
- Node.js 16 o superior
- MySQL 5.7 o superior

### 1. Configurar el backend

```bash
cd backend
npm install
```

Copia el archivo .env.example a .env y edita las variables:

```bash
cp .env.example .env
```

Ejemplo de .env:

```
PORT=3000
NODE_ENV=development

DB_URL=mysql://root:password@localhost:3306/bookmanager_db

JWT_SECRET=super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=super_secret_refresh_token_key
JWT_REFRESH_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=email@gmail.com
EMAIL_PASSWORD=email_password
EMAIL_FROM=noreply@bookmanager.com

FRONTEND_URL=http://localhost:5173

BCRYPT_ROUNDS=10
```

Inicia el backend:

```bash
npm run dev
```

El backend estara disponible en http://localhost:3000

## Ejemplos de requests

### Registrar usuario

POST /api/auth/register

```json
{
  "name": "Juan Perez",
  "email": "juan@email.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Perez",
      "email": "juan@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Iniciar sesion

POST /api/auth/login

```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "name": "Juan Perez",
      "email": "juan@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Obtener todas las categorias

GET /api/categories

Respuesta esperada:

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Fiction",
      "description": "Fiction books"
    },
    {
      "id": 2,
      "name": "Science",
      "description": "Science books"
    }
  ]
}
```

### Crear libro (requiere token)

POST /api/books
Headers:
```
Authorization: Bearer <token>
```

Body:
```json
{
  "title": "Cien anos de soledad",
  "author": "Gabriel Garcia Marquez",
  "isbn": "9780060883287",
  "description": "Una obra maestra de la literatura latinoamericana",
  "publishedYear": 1967,
  "publisher": "Editorial Sudamericana",
  "pages": 471,
  "language": "Spanish",
  "coverImage": "https://example.com/cover.jpg",
  "available": true,
  "categoryId": 1
}
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Libro creado exitosamente",
  "data": {
    "id": 1,
    "title": "Cien anos de soledad",
    "author": "Gabriel Garcia Marquez",
    "isbn": "9780060883287",
    "description": "Una obra maestra de la literatura latinoamericana",
    "publishedYear": 1967,
    "publisher": "Editorial Sudamericana",
    "pages": 471,
    "language": "Spanish",
    "coverImage": "https://example.com/cover.jpg",
    "available": true,
    "categoryId": 1,
    "userId": 1,
    "createdAt": "2026-02-16T10:30:00.000Z",
    "updatedAt": "2026-02-16T10:30:00.000Z"
  }
}
```

### Obtener todos los libros

GET /api/books

Respuesta esperada:

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "title": "Cien anos de soledad",
      "author": "Gabriel Garcia Marquez",
      "isbn": "9780060883287",
      "publishedYear": 1967,
      "available": true,
      "categoryId": 1
    }
  ]
}
```

### Obtener mis libros (requiere token)

GET /api/books/my/books
Headers:
```
Authorization: Bearer <token>
```

Respuesta esperada:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Cien anos de soledad",
      "author": "Gabriel Garcia Marquez",
      "userId": 1
    }
  ]
}
```

### Actualizar libro (requiere token)

PUT /api/books/:id
Headers:
```
Authorization: Bearer <token>
```

Body:
```json
{
  "title": "Cien anos de soledad - Edicion especial",
  "available": false
}
```

### Eliminar libro (requiere token)

DELETE /api/books/:id
Headers:
```
Authorization: Bearer <token>
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Libro eliminado exitosamente"
}
```

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/          # Configuracion de base de datos
│   ├── controllers/     # Controladores de las rutas
│   ├── middleware/      # Middleware de autenticacion y validacion
│   ├── models/          # Modelos de Sequelize
│   ├── repositories/    # Capa de acceso a datos
│   ├── routes/          # Definicion de rutas
│   ├── services/        # Logica de negocio
│   └── utils/           # Utilidades (JWT, validadores, email)
├── .env                 # Variables de entorno
└── package.json
```

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize ORM
- JWT (JSON Web Tokens)
- Bcrypt
- Nodemailer
- Express Validator
- Helmet (seguridad)
- CORS

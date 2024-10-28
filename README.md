# Gravitad-challenge
# Prueba Técnica Fullstack - Películas

Este proyecto es una aplicación web simple que permite visualizar una lista de películas, registrarse e iniciar sesión. Un administrador puede gestionar el CRUD completo de las películas.

## Tecnologías utilizadas

**Backend:** Express, TypeScript, Mongoose, MongoDB, Axios, JSON Web Token (jsonwebtoken), Nodemon  
**Frontend:** React, Vite, TypeScript, Tailwind CSS, SweetAlert, jwt-decode

---

## Funcionalidades del Proyecto

- **Página de inicio:** Visualización de películas, accesible tanto para usuarios registrados como para no registrados.
- **Registro e inicio de sesión:** Permite crear una cuenta e iniciar sesión.
- **Gestión de películas (solo administrador):** CRUD completo de las películas. Para acceder a estas funcionalidades, el usuario debe tener el campo `isAdmin` en `true`.

## Requisitos

- Node.js y npm instalados.

---

## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Configurar las variables de entorno

#### Backend

Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

```plaintext
MONGO_URI=mongodb://your_mongo_url
PORT=Tu_puerto # Ejemplo: 8080
```

#### Frontend

Crear un archivo `.env.local` en la carpeta `front` con la siguiente variable:

```plaintext
VITE_URL_BACKEND="http://localhost:Tu_puerto" # Ejemplo: http://localhost:8080
```

### 3. Instalar dependencias

Ejecutar el siguiente comando en las carpetas `back` y `front`:

```bash
npm install
```

### 4. Ejecutar el backend

En la carpeta `back`, ejecutar:

```bash
npm start
```

El backend estará disponible en `http://localhost:8080`.

### 5. Ejecutar el frontend

En la carpeta `front`, ejecutar:

```bash
npm run dev
```

El front estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

El back este disponible en `http://localhost:8080` (o el puerto que indique la persona).

### 6. Acceder como administrador

Para acceder como administrador, inicia sesión con el correo `admin@example.com` y la contraseña `admin`. 
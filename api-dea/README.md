# Documentación de la API

## Introducción
Esta documentación detalla la estructura y funcionalidad de los archivos del proyecto "api-dea". Se describe el propósito de cada archivo y su relación dentro del sistema.

---

## Estructura del Proyecto

### 1. **Base de Datos**

#### **db.sql**
- Contiene el script para crear y configurar la base de datos.
- Incluye las tablas necesarias para almacenar información de usuarios, publicaciones y puntos DEA.

---

### 2. **Directorio `src/`**
Este directorio contiene el código fuente principal de la API.

#### **`controllers/`**
Contiene los controladores que manejan la lógica de negocio de los endpoints:

1. **auth.controller.ts**
   - Gestiona las operaciones relacionadas con la autenticación.
   - Endpoints:
     - `POST /auth/login`: Inicia sesión.
     - `POST /auth/register`: Registra un nuevo usuario.

2. **deaPoints.controller.ts**
   - Gestiona las operaciones relacionadas con los puntos DEA.
   - Endpoints:
     - `GET /deapoints`: Lista todos los puntos DEA.
     - `POST /deapoints`: Crea un nuevo punto DEA.

3. **index.controller.ts**
   - Proporciona un endpoint principal para verificar el estado del servidor.
   - Endpoint:
     - `GET /`: Devuelve un mensaje indicando que el servidor está funcionando.

4. **posts.controller.ts**
   - Gestiona las operaciones relacionadas con las publicaciones.
   - Endpoints:
     - `GET /posts`: Lista todas las publicaciones.
     - `POST /posts`: Crea una nueva publicación.
     - `DELETE /posts/:id`: Elimina una publicación.

5. **users.controller.ts**
   - Gestiona las operaciones relacionadas con los usuarios.
   - Endpoints:
     - `GET /users`: Lista todos los usuarios.
     - `GET /users/:id`: Obtiene un usuario por su ID.

#### **`helpers/`**

1. **generateToken.ts**
   - Proporciona funciones para generar tokens JWT utilizados en la autenticación.

#### **`models/`**
Define las estructuras de datos utilizadas en la aplicación:

1. **BaseModel.d.ts**
   - Define las interfaces base para los modelos.

2. **DeaPoints.ts**
   - Modelo para los puntos DEA.
   - Propiedades:
     - `id`: Identificador del punto.
     - `location`: Coordenadas geográficas.
     - `description`: Descripción del punto.

3. **Posts.ts**
   - Modelo para las publicaciones.
   - Propiedades:
     - `id`: Identificador de la publicación.
     - `title`: Título.
     - `content`: Contenido.
     - `userId`: ID del usuario creador.

4. **User.ts**
   - Modelo para los usuarios.
   - Propiedades:
     - `id`: Identificador del usuario.
     - `name`: Nombre.
     - `email`: Correo electrónico.
     - `password`: Contraseña (hash).

#### **`routes/`**
Define las rutas que conectan los endpoints con sus respectivos controladores:

1. **auth.routes.ts**
   - Rutas para autenticación.
     - `POST /auth/login`
     - `POST /auth/register`

2. **deaPoints.routes.ts**
   - Rutas para los puntos DEA.
     - `GET /deapoints`
     - `POST /deapoints`

3. **index.routes.ts**
   - Ruta principal.
     - `GET /`

4. **posts.routes.ts**
   - Rutas para las publicaciones.
     - `GET /posts`
     - `POST /posts`
     - `DELETE /posts/:id`

5. **users.routes.ts**
   - Rutas para los usuarios.
     - `GET /users`
     - `GET /users/:id`

#### Archivos Principales

1. **app.ts**
   - Configura el servidor Express y registra los middlewares y rutas.

2. **config.ts**
   - Contiene configuraciones generales como las claves secretas y las credenciales de la base de datos.

3. **db.ts**
   - Configura la conexión con la base de datos PostgreSQL utilizando un cliente como `pg` o `sequelize`.

4. **index.ts**
   - Punto de entrada de la aplicación. Inicia el servidor y conecta la base de datos.

---

## Uso

### Inicializar el Servidor
1. Configurar las variables de entorno en un archivo `.env`.
2. Ejecutar el siguiente comando:
   ```bash
   npm run dev
   ```
3. El servidor estará disponible en `http://localhost:3000`.

### Consumir Endpoints
Utiliza herramientas como Postman o cURL para interactuar con los endpoints descritos en las rutas.

---

## Notas Finales

Esta estructura está diseñada para ser modular y escalable. Cada archivo tiene una responsabilidad clara, facilitando la comprensión y el mantenimiento del código.


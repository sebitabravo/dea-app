# DEA API

API REST para la aplicación DEA construida con Node.js, Express, TypeScript y MySQL.

## 🚀 Características

- **Autenticación JWT** - Sistema seguro de login/registro
- **Base de datos MySQL** - Gestión de usuarios, posts y puntos DEA
- **TypeScript** - Código tipado y más mantenible
- **Docker** - Containerización para fácil despliegue
- **Seguridad** - Helmet, CORS, Rate limiting
- **Manejo de errores** - Middleware centralizado de errores

## 📋 Requisitos previos

- Node.js 18+
- MySQL 8.0+
- Docker (opcional, para contenedores)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd api-dea
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Configurar la base de datos**
```bash
# Crear la base de datos ejecutando db/db.sql en tu MySQL
mysql -u root -p < db/db.sql
```

## 🚀 Uso

### Desarrollo Local

#### Opción 1: Sin Docker
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (usa .env.development)
npm run dev

# O construir y ejecutar para desarrollo
npm run build:dev
npm run start:dev
```

#### Opción 2: Con Docker
```bash
# Desarrollo con Docker Compose
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f api
```

### Producción

#### Opción 1: Local
```bash
# Construir para producción (usa .env.production)
npm run build:prod

# Ejecutar en producción
npm start
```

#### Opción 2: Docker (Recomendado para Dockploy)
```bash
# Producción con Docker Compose
NODE_ENV=production docker-compose -f docker-compose.prod.yml up -d

# O usar el compose general
docker-compose up -d
```

#### Opción 3: Solo contenedor API
```bash
# Build para producción
docker build --target production -t dea-api:prod .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env.production dea-api:prod
```

## 📡 API Endpoints

Todos los endpoints están bajo el prefijo `/api/v1/`

### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/register` - Registrar usuario

### Usuarios  
- `GET /api/v1/users` - Obtener todos los usuarios
- `GET /api/v1/users/:id` - Obtener usuario por ID
- `PUT /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Posts
- `GET /api/v1/posts` - Obtener todos los posts
- `POST /api/v1/posts` - Crear nuevo post
- `GET /api/v1/posts/:id` - Obtener post por ID
- `PUT /api/v1/posts/:id` - Actualizar post
- `DELETE /api/v1/posts/:id` - Eliminar post

### Puntos DEA
- `GET /api/v1/dea-points` - Obtener todos los puntos
- `POST /api/v1/dea-points` - Crear nuevo punto
- `GET /api/v1/dea-points/:id` - Obtener punto por ID
- `PUT /api/v1/dea-points/:id` - Actualizar punto
- `DELETE /api/v1/dea-points/:id` - Eliminar punto

### Sistema
- `GET /health` - Health check

## 🗂️ Estructura del proyecto

```
src/
├── controllers/     # Controladores de rutas
├── routes/         # Definición de rutas
├── models/         # Modelos de datos
├── helpers/        # Utilidades y helpers
├── middleware/     # Middleware personalizado
├── config.ts       # Configuración de variables
├── db.ts          # Conexión a base de datos
├── app.ts         # Configuración de Express
└── index.ts       # Punto de entrada
```

## 🔒 Seguridad

- **Helmet** - Headers de seguridad HTTP
- **CORS** - Control de acceso entre orígenes
- **Rate Limiting** - Límite de peticiones por IP
- **JWT** - Autenticación por tokens
- **bcrypt** - Encriptación de contraseñas

## 🌍 Gestión de Entornos

La API maneja automáticamente diferentes entornos basándose en la variable `NODE_ENV`:

### Archivos de Configuración

- **`.env.development`** - Configuración para desarrollo local
- **`.env.production`** - Configuración para producción
- **`.env.example`** - Plantilla de ejemplo

### Scripts NPM por Entorno

```bash
# Desarrollo
npm run dev                 # Desarrollo con hot-reload
npm run build:dev          # Build para desarrollo
npm run start:dev          # Ejecutar build de desarrollo

# Producción  
npm run build:prod         # Build para producción
npm start                  # Ejecutar en producción
```

### Variables de Entorno por Defecto

#### Desarrollo (`.env.development`)
- Base de datos local (localhost:3306)
- Secret key de desarrollo
- CORS permisivo para desarrollo
- Logging detallado

#### Producción (`.env.production`)
- Configuración de seguridad estricta
- Variables deben ser configuradas manualmente
- Validación automática de variables críticas

## 🚀 Despliegue en Dockploy

### Preparación

1. **Configurar variables de entorno en Dockploy:**
```env
NODE_ENV=production
DB_HOST=tu_host_mysql_hostinger
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_password_mysql
DB_NAME=dea
DB_PORT=3306
SECRET_KEY=tu_clave_super_secreta_de_64_caracteres
ALLOWED_ORIGINS=https://tudominio.com
```

2. **Configuración de Dockploy:**
   - Repositorio: Tu repo de GitHub
   - Puerto: 3000
   - Build Command: `npm run build:prod`
   - Start Command: `npm start`

3. **Base de datos MySQL en Hostinger:**
```bash
# Ejecutar el script de inicialización
mysql -h tu_host -u tu_usuario -p tu_base_de_datos < db/db.sql
```

## 🐛 Desarrollo

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Variables de entorno requeridas

```env
PORT=3000
NODE_ENV=production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=dea
DB_PORT=3306
SECRET_KEY=tu_clave_super_secreta
ALLOWED_ORIGINS=https://tudominio.com
```

## 🤝 Soporte

Si tienes problemas o preguntas, por favor:

1. Revisa la documentación
2. Verifica las variables de entorno
3. Comprueba los logs de la aplicación
4. Abre un issue en el repositorio


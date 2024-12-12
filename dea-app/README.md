# Documentación del Proyecto: DEA App

## Introducción
DEA App es una aplicación desarrollada en React Native que facilita la ubicación y gestión de puntos DEA (Desfibriladores Externos Automáticos). La aplicación incluye funcionalidades de autenticación, exploración de mapas, creación de publicaciones, y configuración de perfil.

---

## Paso 1: Documentación de las clases del proyecto

### 1. **Directorio `componentsUI`**
Contiene componentes reutilizables:

- **ButtonUI.js**: Botón personalizable con colores, tamaños y variantes configurables.
- **InputUI.tsx**: Campo de texto para entrada de datos con validación visual.
- **SelectUI.js**: Menú desplegable con animaciones.
- **ChipUI.js**: Etiqueta visual para categorías o selecciones.

### 2. **Directorio `data`**
Gestiona datos y servicios:

- **api_url.ts**: Configuración de la URL base para las APIs.
- **authServices.ts**: Maneja la autenticación (inicio de sesión, registro).
- **postsServices.ts**: Servicios para crear, listar y eliminar publicaciones.
- **deaPointsServices.ts**: Servicios relacionados con puntos DEA.
- **useFetchData.ts**: Hook para consumir datos desde APIs.

### 3. **Directorio `domain`**
Define modelos y lógica de negocio:

- **User.ts**: Modelo del usuario.
- **Post.ts**: Modelo de publicaciones.
- **DeaPoints.ts**: Modelo de puntos DEA.
- **auth.js**: Estado y acciones de autenticación utilizando Redux.
- **posts.js**: Estado y acciones para publicaciones.

### 4. **Directorio `presentation`**
Incluye pantallas principales:

- **AuthScreen.tsx**: Pantalla principal para autenticación.
- **RegisterScreen.tsx**: Formulario de registro.
- **LoginScreen.tsx**: Formulario de inicio de sesión.
- **MapScreen.tsx**: Pantalla de exploración de mapas.
- **ProfileScreen.tsx**: Visualiza y edita información de perfil.
- **SettingsScreen.tsx**: Configuración de preferencias.
- **CreateDeaPointScreen.tsx**: Formulario para agregar puntos DEA.

### 5. **Directorio `navigation`**
Define la navegación:

- **RootNavigator.tsx**: Navegación principal.
- **MyBottomTab.tsx**: Barra de navegación inferior.
- **AuthStack.tsx**: Maneja las rutas de autenticación.

---

## Paso 2: Manual de Instalación

### Requisitos
- Node.js >= 14.
- Expo CLI.
- Emulador Android/iOS o dispositivo físico.

### Pasos de Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sebitabravo/dea-app.git
   cd dea-app
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno:
   - Crear un archivo `.env` basado en `.env.example`.
   - Agregar las credenciales necesarias.

4. Ejecutar la aplicación:
   ```bash
   npm start
   ```
5. Abrir el proyecto en Expo:
   - Usar el código QR para probar en un dispositivo.
   - Presionar `i` para abrir en un emulador iOS o `a` para Android.

---

## Paso 3: Manual de Usuario

### Introducción
DEA App permite a los usuarios:
- Autenticarse y gestionar su perfil.
- Explorar puntos DEA en un mapa interactivo.
- Crear y listar publicaciones.

### Funcionalidades

1. **Autenticación**
   - Registro: Completar el formulario en `RegisterScreen`.
   - Inicio de sesión: Usar credenciales en `LoginScreen`.

2. **Exploración de Mapas**
   - Navegar a `MapScreen` para ver puntos DEA.
   - Crear un punto desde `CreateDeaPointScreen`.

3. **Publicaciones**
   - Crear publicaciones desde el menú inferior.
   - Ver publicaciones existentes en la lista.

4. **Perfil**
   - Editar información personal desde `ProfileScreen`.

5. **Configuraciones**
   - Ajustar preferencias en `SettingsScreen`.

---

## Paso 4: Preparación de la Entrega

### Estructura de la Entrega

```
/dea-app-entrega
│
├── /src
│   ├── /componentsUI
│   ├── /data
│   ├── /domain
│   ├── /presentation
│   └── /navigation
│
├── package.json
├── .env.example
├── README.md
├── /assets
├── /documentacion
│   ├── manual-instalacion.pdf
│   ├── manual-usuario.pdf
│   ├── documentacion-tecnica.pdf
└── dea-app.apk (o equivalente ejecutable)
```
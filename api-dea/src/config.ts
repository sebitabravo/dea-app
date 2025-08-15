import { config } from "dotenv";
import path from "path";

// Determinar el entorno actual
const NODE_ENV = process.env.NODE_ENV || 'development';

// Cargar el archivo de entorno correspondiente
const envFile = `.env.${NODE_ENV}`;
config({ path: path.resolve(process.cwd(), envFile) });

// Si no existe el archivo específico, usar .env por defecto
config();

console.log(`🚀 Loading environment: ${NODE_ENV}`);
console.log(`📁 Environment file: ${envFile}`);

// Variables de configuración
export const ENVIRONMENT = NODE_ENV;
export const PORT = process.env.PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key-change-in-production';

// Configuración de base de datos
export const DB_CONFIG = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    NAME: process.env.DB_NAME || 'dea',
    PORT: process.env.DB_PORT || 3306
};

// Para compatibilidad con el código existente
export const DB_HOST = DB_CONFIG.HOST;
export const DB_USER = DB_CONFIG.USER;
export const DB_PASSWORD = DB_CONFIG.PASSWORD;
export const DB_NAME = DB_CONFIG.NAME;
export const DB_PORT = DB_CONFIG.PORT;

// Configuración específica por entorno
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';

// Validar variables críticas en producción
if (IS_PRODUCTION) {
    const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'SECRET_KEY'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables for production:');
        missingVars.forEach(varName => console.error(`   - ${varName}`));
        process.exit(1);
    }
    
    if (process.env.SECRET_KEY === 'default-secret-key-change-in-production') {
        console.error('❌ SECURITY WARNING: Please change the SECRET_KEY in production!');
        process.exit(1);
    }
}

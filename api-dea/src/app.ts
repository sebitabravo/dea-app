import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.routes';
import deaPointsRoutes from './routes/deaPoints.routes';
import postRoutes from './routes/posts.routes';
import userRoutes from './routes/users.routes';

// Middleware
import { errorHandler, notFound } from './middleware/errorHandler';

export class App {

    private app: express.Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.set('trust proxy', 1);
    }

    middlewares() {
        // Security middleware
        this.app.use(helmet());
        this.app.use(cors({
            origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
            credentials: true
        }));

        // Rate limiting — global
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: 'Too many requests from this IP, please try again later.'
        });
        this.app.use(limiter);

        // Logging and parsing
        this.app.use(morgan('short'));
        this.app.use(express.json({ limit: '1mb' }));
        this.app.use(express.urlencoded({ extended: true }));

        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.status(200).json({ 
                status: 'OK', 
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });
    }
    
    routes() {
        // Login rate limiter debe aplicarse ANTES de montar authRoutes
        // para que express lo evalue antes de que el router maneje la ruta
        const loginLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 5,
            message: 'Too many login attempts from this IP, please try again later.'
        });
        this.app.use('/api/v1/auth/login', loginLimiter);

        this.app.use('/api/v1', userRoutes);
        this.app.use('/api/v1', deaPointsRoutes);
        this.app.use('/api/v1', authRoutes);
        this.app.use('/api/v1', postRoutes);

        // Error handling middleware (must be last)
        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    getApp(): express.Application {
        return this.app;
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server is running at port', this.app.get('port'));
    }
}
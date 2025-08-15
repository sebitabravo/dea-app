import dotenv from 'dotenv';
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
        this.settigns();
        this.middlewares();
        this.routes();
    }

    settigns() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        dotenv.config();
    }

    middlewares() {
        // Security middleware
        this.app.use(helmet());
        this.app.use(cors({
            origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
            credentials: true
        }));

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too many requests from this IP, please try again later.'
        });
        this.app.use(limiter);

        // Logging and parsing
        this.app.use(morgan('combined'));
        this.app.use(express.json({ limit: '10mb' }));
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
        this.app.use('/api/v1', userRoutes);
        this.app.use('/api/v1', deaPointsRoutes);
        this.app.use('/api/v1', authRoutes);
        this.app.use('/api/v1', postRoutes);

        // Error handling middleware (must be last)
        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server is running at port', this.app.get('port'));
    }
}
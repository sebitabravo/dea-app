import express from 'express';
import morgan from 'morgan';

// Routes
import authRoutes from './routes/auth.routes';
import deaPointsRoutes from './routes/deaPoints.routes';
import postRoutes from './routes/posts.routes';
import userRoutes from './routes/users.routes';

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
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        // this.app.use(IndexRoutes);
        this.app.use(userRoutes);
        this.app.use(deaPointsRoutes);
        this.app.use(authRoutes);
        this.app.use(postRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server is running at port', this.app.get('port'));
    }
}
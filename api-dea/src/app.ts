import express from 'express';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.routes';

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
    }

    routes() {
        this.app.use(IndexRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server is running at port', this.app.get('port'));
    }
}
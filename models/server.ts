import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import tokensRouter from '../routes/tokens';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        tokens: '/tokens',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Iniciamos la base de datos
        this.dbConnection();

        // Middlewares generales
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.apiPaths.tokens, tokensRouter);
    }

    // Inicia el servicio REST
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
}

export default Server;
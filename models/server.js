const express = require('express');
const fileUpload =  require('express-fileupload');
const connectionDB = require('../config/db');

class Server {
    constructor() {
        this.app = express();
        // path
        this.path = '/upload';
        // Database Connection
        this.connectionDB();
        // middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    async connectionDB() {
        await connectionDB();
    }

    middlewares() {
        // Carga de Archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        this.app.use(this.path, require('../routes/server'));
    }

    listen() {
        this.app.listen(3000, () => {
            console.log('Server running at port 3000');
        });
    }

}

module.exports = Server;
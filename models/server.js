const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload =  require('express-fileupload');
const connectionDB = require('../config/db');
const path = require('path');

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
        // Conexion con la base de datos
        await connectionDB();
    }

    middlewares() {
        // Handlebars
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.engine('.hbs', exphbs.engine({
             defaultLayout: 'main', 
             extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
        // Archivos Estaticos
        this.app.use(express.static(path.join(__dirname, '../public')));
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
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running at port ${ process.env.PORT || 3000 }`);
        });
    }
}
module.exports = Server;
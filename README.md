1- npm install
2- node app.js
3- Visit http://localhost:3000/upload

Base de datos en uso: MONGODB

Estructura: 

/config
   -> db.js -> Aquí se hace la conexión a la base de datos (cadena de conexión en .env)
/controllers
   -> database.js -> Manejador para hacer consulta a la API y guardar en la Base de datos
   -> server.js -> Controladores para las peticiones GET y POST
/models
   -> postalUK.js -> Modelo de Esquema para la base de datos
   -> server.js -> Modelo de servidor y configuración de middlewares
/public -> Archivos estaticos
/routes 
   -> server.js -> Rutas
/test -> Carpeta para pruebas unitarias
/uploads -> Carpeta donde se almace el archivo 
/views -> Vistas HTML (Usando Handlebars)
app.js -> Iniciar el servidor.


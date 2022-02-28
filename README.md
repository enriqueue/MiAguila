1- npm install
2- node app.js
3- Ir a http://localhost:3000/upload

Base de datos en uso: MONGODB

Estructura: 

/config
   -> db.js -> Conexión a la base de datos (cadena de conexión en .env)
/controllers
   -> database.js -> Manejador para realizar consultas a la API y guardar en la Base de datos
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



Mi solución:

Para la lectura del archivo utilicé csv-parser que permite leer tabla por tabla en el archivo
Cada tabla o linea se va almacenando en Array llamado coordinates.
Cuando la lectura del archivo termina se envia el array coordinates a la función que hará la 
consulta a la API y a su vez va guardando en la base de datos.

Para la validación de los datos en el archivo:
1) Filtre todas las coordenadas que tienen Lat = 0 y Lon = 0.
2) Si el array devuelto por la API era un array vacio, significa que no tienen 
codigo postal para esa determinada coordenada. Por lo que siginifica que la coordenada 
no fuera del reino unido, sino como en algunos casos de New York.

Una vez que se valide que justamente venga un array con al menos un objecto se almacenará solamente 
el primer elemento de dicho array ya que es el codigo postal más cercano a la coordenada.

TDD -> Para las pruebas unitarias utilicé Mocha, Chai y Chai-http
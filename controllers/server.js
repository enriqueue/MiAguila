const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const addDatabase = require('../controllers/database');

// Get Request
const getController = (req, res) => res.render('index');

// Post Request
const postController = async(req, res) => {

  // Verificando que venga un archivo en la request
  // Caso contrario se envia un 404
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  // Archivo recibido
  file = req.files.file;
  // Ruta donde se almacena el archivo
  uploadPath = path.join(__dirname, '../uploads/' + file.name);
  // Almacenando el archivo
  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
  
  const coordinates = [];
  let zeros = 0;

  fs.createReadStream(path.join(__dirname, '../uploads/' + file.name))
      .pipe(csv({}))
      .on('data', (data) => {
        // Solamente se almacena coordenadas validas
        if (data.lat !== '0' && data.lon !== '0') {
          coordinates.push(data);
        } else {
          zeros ++;
        }
      })
      .on('end', async() => {
        
        res.render('index', {
          total: coordinates.length,
          errors: zeros
        })
        // Esta función se encarga de almacenar en la DB
        addDatabase(coordinates);
    });
}

module.exports = {
    getController, 
    postController
}
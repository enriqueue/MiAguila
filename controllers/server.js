const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
var PostcodesIO = require('postcodesio-client');

// Get Request
const getController = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}

// Post Request
const postController = async(req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  file = req.files.file;

  uploadPath = path.join(__dirname, '../uploads/' + file.name);

  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  const results = [];
  let zeros = 0;

  let postcodes = new PostcodesIO('https://api.postcodes.io');

  fs.createReadStream(path.join(__dirname, '../uploads/' + file.name))
      .pipe(csv({}))
      .on('data', (data) => {
        if (data.lat !== '0' && data.lon !== '0') {
          results.push(data);
        } else {
          zeros ++;
        }
      })
      .on('end', async() => {
          
        res.json({
          elements: 'Número de elementos: ' + results.length,
          errors: 'Número de coordenadas erroneas: ' + zeros
        });

          // for (let i = 0; i < results.length; i ++) {
          //   let nearPostCodes = [];
          //   try {
          //     await postcodes.near(parseFloat(results[i].lat), parseFloat(results[i].lon))
          //       .then(postcode => {

          //         nearPostCodes.push( postcode.map(e => e.postcode) );
          //         console.log(`Lat: ${ results[i].lat } - Lon: ${ results[i].lon }  - Near Post Codes: ${ nearPostCodes }`)
          //       });
          //   } catch (error) {
          //     console.log(error);
          //   }
          // }
    });
    console.log(results.length);
}

module.exports = {
    getController, 
    postController
}
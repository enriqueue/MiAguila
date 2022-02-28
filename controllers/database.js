const PostcodesIO = require('postcodesio-client');
const PostalCodes = require('../models/postalUK');
const postcodes = new PostcodesIO('https://api.postcodes.io',);

const addDatabase = async(coordinates) => {

        for (let i = 0; i < coordinates.length; i ++) {
            try {
                // Consulta a la API
                const postalCodeAnswer = await postcodes.near(parseFloat(coordinates[i].lat), parseFloat(coordinates[i].lon));
                // Verificando que exista un codigo postal para la coordenadas
                if ( postalCodeAnswer.length >= 1 ) {

                   // Creando el objecto 
                   let postalCode = new PostalCodes({
                        lat: coordinates[i].lat,
                        lon: coordinates[i].lon,
                        postalCode: postalCodeAnswer[0].postcode
                   });
                   // Guardando en la Base de Datos
                   await postalCode.save();
                   console.log('Saved on DB');
                   console.log(`Lat: ${ coordinates[i].lat } - Lon: ${ coordinates[i].lon }  - Near Post Code: ${ postalCodeAnswer[0].postcode }`)
                }
                } catch (error) {
                    console.log(error);
                    throw new Error;
           }
         }
}

module.exports = addDatabase;
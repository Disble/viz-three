// este archivo crea el archivo .env en produccion con las variables de entorno
// que deben estar en produccion mismo
const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.URL_API}\n`);
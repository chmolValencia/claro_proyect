const express = require('express');
const cors = require('cors');

const app = express();

// Configurar CORS
app.use(cors({ credentials: true, origin: true }));

// Resto de la configuración del servidor

// Iniciar el servidor
app.listen(4300, () => {
    console.log('Servidor de Angular iniciado en el puerto 4300');
});
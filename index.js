import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la bd 
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

const port = process.env.DB_PORT || 3000;

// Habilitando PUG
app.set('view engine', 'pug');
 
// Obtener el año actual
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

// Agregar el body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'))

// Agregando al router
app.use('/', router);

app.listen(port,() => {
    console.log(`El servidor esta funcionando en el ${port}`);
})
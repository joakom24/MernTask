const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
//Crear el sv
const app = express()

//Conectar a db
connectDB()

//Habilitar cors
app.use(cors())
// Habilitar express.json
app.use(express.json({extended: true}))


//Puerto de la app
const port = process.env.PORT || 4000;


//Importar rutas
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))


//Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
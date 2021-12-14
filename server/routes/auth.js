//Rutas de auth usuarios
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const authController = require('../controllers/authController')
//Iniciar sesion
// api/users
router.post('/', 
    authController.autentictUser
)


router.get('/',
    auth,
    authController.userAuth

)
module.exports = router
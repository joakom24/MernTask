const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//Crea un proyecto 
// api/projects
router.post('/',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.createProject
)

//Obtener proyectos
router.get('/',
    auth,
    projectController.getProjects
)

//Actualizar proyectos
router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.actualizateProject

)

//Eliminar proyecto
router.delete('/:id',
    auth,
    projectController.deleteProject

)

module.exports = router
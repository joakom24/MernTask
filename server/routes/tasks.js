const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//Crear task
// api /task
    router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()

    ],
    taskController.createTask
    )   
    //Obtener tasks por projects
    router.get('/',
        auth,
        taskController.getTasks
    )

    //Actualizar tarea
    router.put('/:id',
        auth,
        taskController.updateTask
    )

    //Eliminar tarea
    router.delete('/:id',
    auth,
    taskController.deleteTask
    )
    module.exports = router
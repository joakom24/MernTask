const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

//Crear tarea
exports.createTask = async (req, res) => {
    //Revisa si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    
    try {
        //Extraer el proyecto y comprobar
        const { project } = req.body
        const existProject = await Project.findById(project)
        if(!existProject){
            return res.status(404).json({msg: 'Proyecto no encontrado.'})
        }

        //Revisar si el proyecto actual pertenece al usuario
        if(existProject.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }

        //Crear tarea
        const task = new Task (req.body)
        await task.save()
        res.json({task})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error.')
    }

}

//Obtiene tasks por project

exports.getTasks = async(req, res) => {
    try {
        //Extraer el proyecto y comprobar
        const { project } = req.query
        const existProject = await Project.findById(project)
        if(!existProject){
            return res.status(404).json({msg: 'Tarea no encontrada.'})
        }

        //Revisar si el proyecto actual pertenece al usuario
        if(existProject.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }

        //Obtener tasks 
        const tasks = await Task.find({ project }).sort({created: -1})
        res.json({tasks})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error.')
    }

}

//Actualizar tarea

exports.updateTask = async (req, res) => {
    try {
        //Extraer el proyecto y comprobar
        const { project, name, state } = req.body
        //If task
        let task = await Task.findById(req.params.id)
        if(!task) {
             return res.status(404).json({msg: 'No existe'})
        }
        //Extraer proyecto 
        const existProject = await Project.findById(project)
        //Revisar si el proyecto actual pertenece al usuario
        if(existProject.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }
         //Crear objeto
         const newTask = {}
         newTask.name = name
         
         newTask.state = state
     
        //Guarda tarea
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, { new: true })
        res.json({task})

       
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error.')
    }
}

//Borrar tarea
exports.deleteTask = async (req, res) => {
    try {
        //Extraer el proyecto y comprobar
        const { project } = req.query
        //If task
        let task = await Task.findById(req.params.id)
        if(!task) {
             return res.status(404).json({msg: 'No existe'})
        }
        //Extraer proyecto 
        const existProject = await Project.findById(project)
        //Revisar si el proyecto actual pertenece al usuario
        if(existProject.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }
        //Eliminar
        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea eliminada.'})
       
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error.')
    }
}
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {
    //Revisa si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        //Nuevo proyecto
        const project = new Project(req.body)
        //Guardar creador via jwt
        project.create = req.user.id
        //Guardar proyecto
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Obtiene proyectos del user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ create: req.user.id }).sort({ created: -1 })
        res.json({ projects })
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Actualiza un proyecto
exports.actualizateProject = async (req, res) => {
    //Revisa si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //Extraer info del proyecto
    const { name } = req.body
    const newProject = {}

    if(name){
        newProject.name = name
    }

    try {
        //Revisar id
        let project = await Project.findById(req.params.id)
        //IF project 
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado.'})
        }
        //Verificar creador del proyecto
        if(project.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }
        //Actualizar
        project = await Project.findByIdAndUpdate({_id: req.params.id}, { $set: newProject
        }, { new: true})
        res.json({project})
    } catch (error) {
        console.error(error)
        res.status(500).send('Error en el servidor.')
    }
}

//Elimina proyecto
exports.deleteProject = async(req, res) => {
    try {
        //Revisar id
        let project = await Project.findById(req.params.id)
        //IF project 
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado.'})
        }
        //Verificar creador del proyecto
        if(project.create.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado.'})
        }

        //Elimina proyecto
        await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado.'})
    } catch (error) {
        console.error(error)
        res.status(500).send('Error en el servidor.')
    }
}
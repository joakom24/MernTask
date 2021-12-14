import React, { useContext, useEffect, useState } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/TaskContext'


const FormTask = () => {
     //Si proyecto esta activo
     const projectsContext = useContext(projectContext)
     const {project } = projectsContext

     //obtener task context 
    const tasksContext = useContext(taskContext)
    const {taskselection, errortask
        , addTask, validateTask, getTasks, actualizateTask, cleanTask
    } = tasksContext
     
    //effect que detecta tarea seleccionada 
    useEffect(() => {
        if(taskselection !== null){
            saveTask(taskselection)
        }else {
            saveTask({
                name: ''
            })
        }
    }, [taskselection])
    //state form 
     const [task, saveTask] = useState({
         name: '',
     })

     //extraer el nombre del proyecto
     const { name } = task
      //Sin proyectos 
    if(!project) return null

    //Array destructuring 
    const  [projectNow] = project
     //Leer valores del form
     const handleChange = e => {
         saveTask({
             ...task,
             [e.target.name]: e.target.value
         })
     }
    const onSubmit = e => {
        e.preventDefault()
        
        //validar
        if(name.trim() === ''){
            validateTask()
            return
        }   
        
        //Si es edicion o nueva tarea
        if(taskselection === null){
            //tarea nueva
            task.projectId = projectNow.id
            task.state= false
            addTask(task)
        }else {
            //actualizar tarea
            actualizateTask(task)

            //Elimina tareaseleccionada del state
            cleanTask()
        }


        //Obtener y filtrar tareas
        getTasks(projectNow.id)
        //reiniciar form
        saveTask({
            name: ''
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text"  value={name} onChange={handleChange} placeholder="Name task" name="name"/>
                </div>
                <div>
                    <button>{taskselection ? 'Editar tarea' : 'Agregar tarea'}</button>
                </div>
            </form>
            {errortask ? <p>El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTask

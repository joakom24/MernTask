import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/TaskContext'

const Project = ({project}) => {
    //Obtener el state
    const projectsContext = useContext(projectContext)
    const {projectNow } = projectsContext
    //obtener task context 

    const tasksContext = useContext(taskContext)
    const {getTasks} = tasksContext
    //Funcion para agregar proyecto actual
    const selectProject = id => {
        projectNow(id)//Fijar un proyecto actual
        getTasks(id)//Filtrar las tareas cuando se de click
    }
    return (
       <li>
           <h1 onClick={() => selectProject(project.id)}>
            {project.name}
           </h1>
       </li>
    )
}

export default Project

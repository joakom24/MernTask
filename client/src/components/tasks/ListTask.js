import React, { useContext } from 'react'
import Task from './Task'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/TaskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
const ListTask = () => {
    //Obtener el state
    const projectsContext = useContext(projectContext)
    const {project, deleteProject} = projectsContext
    //obtener tareas proyecto
    const tasksContext = useContext(taskContext)
    const {tasksproject} = tasksContext
    //Sin proyectos 
    if(!project) return <h2>Selecciona un proyecto</h2>
    
    //Array destructuring 
    const  [projectNow] = project
    //Borrar un proyecto 
    const onClickDelete = () => {
        deleteProject(projectNow.id)
    }
    return (
        <div>
            <h2>Project: {projectNow.name}</h2>
            <ul>
                {tasksproject.length === 0 
                ? (<li><p>No hay tareas</p></li>)
                : <TransitionGroup>
                    {tasksproject.map(task => (
                    <CSSTransition key={task.id} timeout={200} className="task">
                        <Task  task={task} />
                    </CSSTransition>
                ))}
                </TransitionGroup>
            }
            </ul>
            <button onClick={onClickDelete}>Delete Project &times;</button>
        </div>
    )
}

export default ListTask

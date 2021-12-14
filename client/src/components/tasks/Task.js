import React, { useContext } from 'react'
import taskContext  from '../../context/tasks/TaskContext'
import projectContext from '../../context/projects/projectContext'


const Task = ({task}) => {
    //Si proyecto esta activo
    const projectsContext = useContext(projectContext)
    const {project } = projectsContext
    
    //obtener task context 
    const tasksContext = useContext(taskContext)
    const { deleteTask, getTasks, changeStateTask, saveTaskActually} = tasksContext


    //EXTRAER PROYECTO
    const [projectNow] = project
    //Se ejecuta al apretar btn de borrar
    const taskDelete = id => {
        deleteTask(task.id)
        getTasks(projectNow.id)
    }

    //funcion que modifica state de tasks
    const changeState = task => {
        if(task.state) {
            task.state = false
        } else {
            task.state = true
        }
        changeStateTask(task)
    }

    //funcion para editar tareas
    const selectTask = task => {
        saveTaskActually(task)
    }
    return (
        <div>
            <li><p>{task.name}</p></li>

            <div className="state">
                {
                task.state 
                ?
                (
                    <button onClick={() => {
                        changeState(task)
                    }}>Completed</button>
                )
                :
                (
                    <button onClick={() => {
                        changeState(task)
                    }}>Incompleted</button>
                )
            
            }
            </div>
            <div className="actions">
                <button onClick={() => selectTask(task)}>
                    Edit
                </button>
                <button onClick={() => taskDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Task

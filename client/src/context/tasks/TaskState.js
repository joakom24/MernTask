import {  useReducer } from "react";
import {TASK_PROJECT, ACTUALIZATE_TASK,CLEAN_TASK , ACTUALLY_TASK, ADD_TASK, VALIDATE_TASK, DELETE_TASK, STATE_TASK} from '../../types'
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'
import { v4 as uuidv4 } from 'uuid';
const TaskState = props => {
    const initialState = {
        tasks: 
        [
        {id: 1, name: 'elegir pa', estado:true, projectId: 1},
        {id: 2, name: 'elegir colores', estado:false, projectId: 2},
        {id: 3, name: 'elegir pago', estado:false, projectId: 3},
        {id: 4, name: 'elegir host', estado:true , projectId:4 }
    ],
    tasksproject : null,
    errortask: false,
    taskselection: null
    }
    

    //Crear disptach y state

    const [state, dispatch] = useReducer(TaskReducer, initialState)
    
    //Funciones

    //Obtener tareas
    const getTasks = projectId => {
        dispatch({
            type: TASK_PROJECT,
            payload: projectId
        })
    }
    //Agregar tarea al proyecto
    const addTask = task => {
        task.id = uuidv4
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    //Valida y muestra error
    const validateTask = () =>{
        dispatch({
            type: VALIDATE_TASK,
        })
    }

    //Eliminar tarea por id
    const deleteTask = id => {
        dispatch ({
            type: DELETE_TASK,
            payload:  id
        })
    }

    //Cambia el estado de cada tarea
    const changeStateTask = task => {
        dispatch({
            type: STATE_TASK,
            payload: task
        })
    }

    //Extrae una tarea para edicion
    const saveTaskActually = task => {
        dispatch({
            type: ACTUALLY_TASK,
            payload: task
        })
    }

    //edita o modifica una tarea
    const actualizateTask = task => {
        dispatch({
            type: ACTUALIZATE_TASK,
            payload: task
        })  
    }

    //ELIMINA TAREA SELECCIONADA
    const cleanTask = () => {
        dispatch ({
            type: CLEAN_TASK,
        })
    }
    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            tasksproject: state.tasksproject,
            errortask: state.errortask,
            taskselection: state.taskselection,
            validateTask,
            getTasks,
            addTask,
            deleteTask,
            changeStateTask,
            saveTaskActually,
            actualizateTask,
            cleanTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState
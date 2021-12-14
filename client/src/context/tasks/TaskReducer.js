import {TASK_PROJECT, ACTUALIZATE_TASK, STATE_TASK, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUALLY_TASK, CLEAN_TASK} from '../../types'
const TaskReducer = (state, action) => {
    switch(action.type){
        case TASK_PROJECT :
            return {
                ...state,
                tasksproject: state.tasks.filter(task => task.projectId === action.payload)
           }
        case ADD_TASK :
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks],
                errortask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: true
            }
        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case ACTUALIZATE_TASK:
        case STATE_TASK :
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            }
        case ACTUALLY_TASK :
            return {
                ...state,
                taskselection: action.payload
            }   
        case CLEAN_TASK :
            return {
                ...state,
                taskselection: null
            }   
        default: 
        return state
    }
}

export default TaskReducer
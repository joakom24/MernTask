import { ADD_PROJECT, PROJECT_NOW, FORM_PROJECT, GET_PROJECT, VALIDATE_FORM, DELETE_PROJECT } from '../../types'

const red  = (state, action) => {
    switch(action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
            case GET_PROJECT: 
            return {
                ...state,
                projects: action.payload
            }
            case ADD_PROJECT: 
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                errorForm: false
            }
            case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true
            }
            case PROJECT_NOW:
                return {
                    ...state,
                    project: state.projects.filter(project => project.id === action.payload)
                }
            case DELETE_PROJECT:
                return {
                    ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
                
        default: 
        return state;
    }
}
export default red
import projectContext from './projectContext'
import React, { useReducer } from "react";
import projectReducer from './projectReducer'
import { FORM_PROJECT, DELETE_PROJECT, VALIDATE_FORM, PROJECT_NOW, GET_PROJECT, ADD_PROJECT } from '../../types'
import { v4 as uuidv4 } from 'uuid';




const ProjectState = props => {
    const projects = [
        {id: 1,name: 'jorge'},
        {id: 2,name: 'maria'},
        {id: 3,name: 'no se'}
    ]

    const initialState = {
        projects : [],
        form : false,
        errorForm: false,
        project: null
    }

    //Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer( projectReducer, initialState)

    //Funciones para el CRUD
    const viewForm = () => {
        dispatch({
        type: FORM_PROJECT
    })
    }
    
    //Obtener proyectos
    const getProjects = () => {
        dispatch({
            type: GET_PROJECT,
            payload: projects
        })
    }


    //Agregar proyecto 
    const addProject = project => {
        project.id = uuidv4()

        //Insertar proyecto en el state 
        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
    }


    //Valida el form 
    const showError = () =>{
        dispatch({
            type: VALIDATE_FORM
        })
    }


    //Selecciona proyecto 
    const projectNow = projectId => {
        dispatch ( {
            type: PROJECT_NOW,
            payload: projectId
        })
    }

    //Elimina proyecto 

    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }
    return ( 
        <projectContext.Provider value={{
            projects: state.projects,
            form: state.form,
            errorform: state.errorForm,
            project: state.project,
            viewForm,
            getProjects,
            addProject,
            showError,
            projectNow,
            deleteProject
        }}>{props.children}</projectContext.Provider>
    )
}

export default ProjectState
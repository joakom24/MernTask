import React, { useContext, useEffect } from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const List = () => {
    //Extraer proyecots de state inicial
    const projectsContext = useContext(projectContext)
    const {projects, getProjects} = projectsContext
    //Obtener proyectos cuando carga el componente
    useEffect (() => {
        getProjects()
        //eslint-disablenext-line
    }, [])
    //Revisar si proyectos tiene contenidos
    if (projects.length === 0) return <p>No hay proyectos. Crea uno.</p>;

  
    return (
        <ul>
            <TransitionGroup>
            {projects.map(project => (
                <CSSTransition key={project.id} timeout={200} className="project">
                    <Project 
                project={project} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    )
}

export default List

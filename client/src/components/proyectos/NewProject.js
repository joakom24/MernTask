import React, { useContext, useState } from 'react'
import projectContext from '../../context/projects/projectContext'
const NewProject = () => {
    //Obtener el state
    const projectsContext = useContext(projectContext)
    const { form, errorform, viewForm, addProject, showError,  } = projectsContext
    //State del proyecto 
    const [project, saveProject] = useState({
        name: ''
    })
    //Destructuro el nombre del proyecto
    const {name} = project
    //Lee los inputs
    const onChangeProject = e => {
        saveProject({
            //Evito que se reescriban los value con ...project
            ...project,
            [e.target.name]: e.target.value
        })
    }

    //Enviar proyecto
    const onClickProject = e => {
        e.preventDefault()

        //Validar el proyecto
        if ( name === ''){
            showError()
            return
        }
        //Agregar proyecto al state
        addProject(project)
        //Reiniciar el form
        saveProject ({
            name: ''
        })
    }


    return (
        <>
        <button type="button" onClick={() => viewForm()} >New project</button>
        {
            form
            ?
            (
                <form>
                    <input value={name} type="text" id="name" name="name" placeholder="Name project" onChange={onChangeProject}/>
                    <button type="button" onClick={onClickProject}>Add project</button>
                </form>
            ) : null
        }
        {
            errorform ? <p>El nombre es obligatorio.</p> :null
        }
        </>
    )
}

export default NewProject

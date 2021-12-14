import '../Styles/Sidebar.css'
import React from 'react'
import NewProject from '../proyectos/NewProject'
import List from '../proyectos/List'

const Sidebar = () => {
    return (
        <div className="section-one">
            <h1>Tasks React</h1>
            <NewProject />
            <div className="projects">
                <h2>Your Projects</h2>
                <List />
            </div>
        </div>
    )
}

export default Sidebar

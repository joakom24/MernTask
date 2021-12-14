import React from 'react'
import Sidebar from '../layout/Sidebar'
import Bar from '../layout/Bar'
import FormTask from '../tasks/FormTask'
import ListTask from '../tasks/ListTask'
const Projects = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className="first-section">
                <Bar />
                <div>
                <FormTask/>
                    <div className="task-container">
                       <ListTask />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects

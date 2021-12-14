import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Projects from './components/proyectos/Projects'
import ProjectState from './context/projects/projectState'
import TaskState from './context/tasks/TaskState'
function App() {
  return (
    //Defino Rutas
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/new-Account" component={NewAccount}/>
            <Route exact path="/projects" component={Projects}/>
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  );
}

export default App;

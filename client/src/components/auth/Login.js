import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    //Creo el state de usuarios
    const [user, saveUser] = useState({
        email: '',
        password: ''
    })
    //Destructuro el state para validar values
    const {email, password}= user;


    const onChange = e => {
        saveUser({
            //Evito que se reescriban los value con ...user
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //Funcion para que el usuario inicie sesión
    const submit = e => {
        e.preventDefault()
    }
    //Valido que no haya campos vacios

    //Pasarlo al action
    return (
        <div className="container">
            <h1>Iniciar Sesión </h1>
            <form>
                    <label>Email address</label>
                    <input value={email} type="email" placeholder="Enter email" id="email" name="email" onChange={onChange}/>
                    <label>Password</label>
                    <input value={password} type="password" placeholder="Password" name="password" id="password" onChange={onChange}/>
                <button onClick={submit}variant="primary" type="submit">
                    Login
                </button>
            </form>

            <Link to={'/new-account'}>Create account</Link>
        </div>
    )
}

export default Login

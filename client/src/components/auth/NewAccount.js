import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const NewAccount = () => {
    //Creo el state de usuarios
    const [user, saveUser] = useState({
        email: '',
        password: '',
        name: '',
        confirm: ''
    })
    //Destructuro el state para validar values
    const {email, password, name, confirm}= user;


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
    //Validar password minimo de 6 caracteres
    //Validar password iguales
    //Pasarlo al action
    return (
        <div className="container">
            <h1>Create account </h1>
            <form>
                    <label>Name</label>
                    <input value={name} type="text" id="name" name="name" placeholder="Your name" onChange={onChange}></input>
                    <label>Email address</label>
                    <input value={email} type="email" placeholder="Enter email" id="email" name="email" onChange={onChange}/>
                    <label>Password</label>
                    <input value={password} type="password" placeholder="Password" name="password" id="password" onChange={onChange}/>
                    <label>Confirm password</label>
                    <input value={password} type="password" placeholder="Confirm your password" name="confirm" id="confirm" onChange={onChange}/>
                    <button onClick={submit} variant="primary" type="submit">
                        Register
                    </button>
            </form>

            <Link to={'/'}>Login</Link>
        </div>
    )
}

export default NewAccount

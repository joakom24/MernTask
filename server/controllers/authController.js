const User = require ('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult }= require('express-validator')
const jwt = require('jsonwebtoken')

exports.autentictUser = async (req, res) => {
    //Revisa si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //extraer el email y pass
    const {email, password} = req.body

    try {
        //Revisar que sea un user registrado
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        //Revisar password
        const  passCheck = await bcryptjs.compare(password, user.password)
        if(!passCheck) {
            return res.status(400).json({msg: 'Password incorrecto.'})
        }
        
        //Si es correcto crear y firma jwt
        //Crear el jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        //Firmar token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600//1 hora
        }, (error, token) => {
            if (error) throw error;

            //Mensaje
        res.json({ token })
        })


   
    } catch (error) {
        console.log(error)
    }
}

//Obtiene user auth
exports.userAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}
const User = require ('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult }= require('express-validator')
const jwt = require('jsonwebtoken')
exports.createUser = async (req, res) => {
    //Revisa si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //extraer email y pass
    const {email, password} = req.body
    try {
        //Revisar que el usuario sea unico
        let user= await User.findOne({ email })

        if(user) {
            return res.status(400).json({ msg: 'El usuario ya existe :/' })
        }

        //Crea nuevo user
        user = new User(req.body)

        //Hashear el pass
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        //Guarda user
        await user.save()

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
        res.status(400).send('Hubo un error :(')
    }
}
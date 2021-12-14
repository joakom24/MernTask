const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    //Leer el token
    const token = req.header('x-auth-token')
    //Revisar si hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay token.'})
    }
    //Validarlo

    try {
        const cifrate = jwt.verify(token, process.env.SECRET)
        req.user = cifrate.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: 'Token no valido.'})
    }
}
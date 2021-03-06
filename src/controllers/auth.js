const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = express.response ) => {
    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }

        usuario = new Usuario( req.body )
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

        const token = await generarJWT( usuario.id, usuario.name )

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }
}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no son correctos'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password)
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario o Contraseña no son correctos'
            })
        }

        const token = await generarJWT( usuario.id, usuario.name )

        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al intentar loguearse'
        })
    }
}

const revalidarToken = async (req, res) => {
    const { uid, name } = req

    const token = await generarJWT( uid, name )

    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

const express = require('express')
const Todo = require('../models/todo')

const getTodos = async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json({
        todos
    })
}

const getTodo = async (req, res) => {

    const id = req.params.id
    const todo = await Todo.findById(id)

    res.json({
        ok: true,
        todo
    })
}

const crearTodo = async ( req, res = express.response ) => {

    const todo = new Todo( req.body )

    try {
        const todoGuardado = await todo.save()

        res.json({
            ok: true,
            todo: todoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el todo'
        })
    }
}

const actualizarTodo = async ( req, res = express.response ) => {

    const todoId = req.params.id

    try {
        const todo = await Todo.findById( todoId )

        if ( !todo ) {
            const msg = `El todo no existe por el id: ${todoId}`
            console.log(msg)
            return res.status(404).json({
                ok: false,
                msg
            })
        }

        const nuevoTodo = {
            ...req.body
        }

        const todoActualizado = await Todo.findByIdAndUpdate( todoId, nuevoTodo, { new: true } )

        res.json({
            ok: true,
            todo: todoActualizado
        })

        
    } catch (error) {
        console.error(error)
        const msg = `Error al actualizar el todo por el id: ${todoId}`
        console.log(msg)

        res.status(500).json({
            ok: false,
            msg
        })
    }
}

const borrarTodo = async ( req, res = express.response ) => {

    const todoId = req.params.id

    try {
        const todo = await Todo.findById( todoId )

        if ( !todo ) {
        const msg = `Evento no existe por el id: ${todoId}`
        console.log(msg)
            return res.status(404).json({
                ok: false,
                msg
            })
        }

        await Todo.findByIdAndDelete( todoId )

        res.json({ ok: true })

    } catch (error) {
        console.log(error)
        const msg = 'Error al borrar el registro'
        console.log(msg)
        res.status(500).json({
            ok: false,
            msg
        })
    }
}

module.exports = {
    getTodos,
    getTodo,
    crearTodo,
    actualizarTodo,
    borrarTodo
}

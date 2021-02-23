const express = require('express')
const logger = require('../config/logger')
const Todo = require('../models/todo')

const getTodos = async (req, res) => {
    logger.info('Getting all todos')
    const todos = await Todo.find()
    res.status(200).json({
        todos
    })
}

const getTodo = async (req, res) => {
    const id = req.params.id
    logger.info(`Getting todo by id: ${id}`)
    try {
        const todo = await Todo.findById(id)
        logger.verbose(`todo obtained: ${todo}`)
        res.json({
            ok: true,
            todo
        })
    } catch (error) {
        const msg = `El todo no existe por el id: ${id}`
        logger.error(msg)
        res.status(404).json({
            ok: false,
            msg
        })
    }

}

const crearTodo = async ( req, res = express.response ) => {
    logger.info('Creating a new todo')
    const todo = new Todo( req.body )

    try {
        const todoGuardado = await todo.save()
        logger.verbose(`todo created: ${todoGuardado}`)
        res.json({
            ok: true,
            todo: todoGuardado
        })

    } catch (error) {
        const msg = 'Error al crear el todo'
        logger.error(msg)
        logger.error(error)
        res.status(500).json({
            ok: false,
            msg
        })
    }
}

const actualizarTodo = async ( req, res = express.response ) => {
    const todoId = req.params.id
    logger.info(`Updating a todo, id: ${todoId}`)

    try {
        const todo = await Todo.findById( todoId )

        if ( !todo ) {
            const msg = `El todo no existe por el id: ${todoId}`
            logger.error(msg)
            return res.status(404).json({
                ok: false,
                msg
            })
        }

        const nuevoTodo = {
            ...req.body
        }

        const todoActualizado = await Todo.findByIdAndUpdate( todoId, nuevoTodo, { new: true } )
        logger.verbose(`todo updated: ${todoActualizado}`)
        res.json({
            ok: true,
            todo: todoActualizado
        })

        
    } catch (error) {
        const msg = `Error al actualizar el todo por el id: ${todoId}`
        logger.error(msg)
        logger.error(error)

        res.status(500).json({
            ok: false,
            msg
        })
    }
}

const borrarTodo = async ( req, res = express.response ) => {
    const todoId = req.params.id
    logger.info(`Deleting a todo, id: ${todoId}`)

    try {
        const todo = await Todo.findById( todoId )

        if ( !todo ) {
        const msg = `Evento no existe por el id: ${todoId}`
        logger.error(msg)
            return res.status(404).json({
                ok: false,
                msg
            })
        }

        await Todo.findByIdAndDelete( todoId )

        logger.verbose(`Todo id: ${todoId} has been deleted`)
        res.json({ ok: true })

    } catch (error) {
        const msg = 'Error al borrar el registro'
        logger.error(msg)
        logger.error(error)
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

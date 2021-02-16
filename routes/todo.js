const { Router } = require('express')
const { getTodos, crearTodo, getTodo, actualizarTodo, borrarTodo } = require('../controllers/todo')

const router = Router()

router.get('/all', getTodos)
router.get('/findBy/:id', getTodo)
router.post('/', crearTodo)
router.put('/:id', actualizarTodo)
router.delete('/:id', borrarTodo)

module.exports = router

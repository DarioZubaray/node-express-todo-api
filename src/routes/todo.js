const { Router } = require('express')
const { check } = require('express-validator')
const {
  getTodos,
  crearTodo,
  getTodo,
  actualizarTodo,
  borrarTodo,
} = require('../controllers/todo')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()
router.use(validarJWT)

router.get('/all', getTodos)
router.get('/findBy/:id', getTodo)
router.post(
  '/',
  [
    check('message', 'El mensaje es obligatorio').not().isEmpty(),
    check('finished', 'El estado terminado es obligatorio').not().isEmpty(),
    check('datetime', 'La fecha es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearTodo,
)
router.put('/:id', actualizarTodo)
router.delete('/:id', borrarTodo)

module.exports = router

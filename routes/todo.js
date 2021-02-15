const { Router } = require('express');
const { getGreetings } = require('../controllers/todo');

const router = Router()

router.get('/', getGreetings);

module.exports = router
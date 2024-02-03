const Router = require('express')
const router = new Router()
const usetController = require('../controller/user.controller')
const userController = require('../controller/user.controller')

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user', userController.deleteUser)

module.exports = router
const Router = require('express')
const router = new Router()

const characterController = require('../controller/character.controller')

router.post('/character/add', characterController.addCharacter)
router.post('/character/update', characterController.updateCharacter)
router.post('/character/delete', characterController.deleteCharacter)
router.post('/character/getAll', characterController.getAllCharacters)
router.post('/character/getOne', characterController.getOneCharacter)

module.exports = router
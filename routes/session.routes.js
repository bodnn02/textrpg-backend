const Router = require('express')
const router = new Router()

const sessionController = require('../controller/session.controller')

router.post('/session/create', sessionController.addSession)
router.post('/session/check', sessionController.checkSession)

module.exports = router
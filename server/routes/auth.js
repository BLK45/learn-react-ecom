const express = require('express')
const router = express.Router()

const { regsiter, login , currentUser } = require('../controllers/auth')
const { authCheck, adminCheck } = require('../middlewares/authCheck')


router.post('/regsiter', regsiter)
router.post('/login', login)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)


module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

// Method GET
router.get('/', controller.getAllAccountData)
router.get('/get/balance/:accountNumber', controller.getBalance)
router.get('/get/account/:accountNumber', controller.getAccountData)

// Method POST
router.post('/add/account', controller.addAccountData)
router.post('/deposit', controller.depositMoney)
router.post('/withdraw', controller.withdrawMoney)
router.post('/transfer', controller.transferMoney)

module.exports = router

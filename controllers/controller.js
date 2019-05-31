const mongoose = require('mongoose')
const model = require('../models/model')
const atm = require('./atmController')

exports.getAllAccountData = async (req, res, next) => {
  let accountNumber = req.params.accountNumber
  try {
    let result = await atm.getAllAccount(accountNumber)
    res.render("index", { test: result })
  } catch (err) {
    console.error(err);
  }
}

exports.getAccountData = async (req, res, next) => {
  let accountNumber = req.params.accountNumber
  try {
    let result = await atm.findAccountNumber(accountNumber)
    res.render("index", { test: result })
  } catch (err) {
    console.error(err);
  }
}

exports.addAccountData = async (req, res, next) => {
  const openAccount = new model({
    _id: mongoose.Types.ObjectId(),
    accountNumber: req.body.account_number,
    accountPassword: req.body.account_password,
    endingBalance: req.body.ending_balance,
  })
  try {
    await atm.openNewAccount(openAccount)
    res.redirect('/')
  } catch (err) {
    console.error(err);
  }
}

exports.getBalance = async (req, res, next) => {
  let accountNumber = req.params.accountNumber
  try {
    let result = await atm.getAccountBalance(accountNumber)
    res.render("index", { test: result })
  } catch (err) {
    console.error(err);
  }
}

exports.depositMoney = async (req, res, next) => {
  let accountNumber = req.body.account_number
  let transactionAmount = req.body.transaction_amount
  try {
    let result = await atm.findAccountNumber(accountNumber)
    await atm.deposit(accountNumber, result.endingBalance, transactionAmount)
    res.redirect('/')
  } catch (err) {
    console.error(err);
  }

}

exports.withdrawMoney = async (req, res, next) => {
  let accountNumber = req.body.account_number
  let transactionAmount = req.body.transaction_amount
  try {
    let result = await atm.findAccountNumber(accountNumber)
    await atm.withdraw(accountNumber, result.endingBalance, transactionAmount)
    res.redirect('/')
  } catch (err) {
    console.error(err);
  }
}

exports.transferMoney = async (req, res, next) => {
  let fromAccountNumber = req.body.from_account_number
  let toAccountNumber = req.body.to_account_number
  let transactionAmount = req.body.transaction_amount
  try {
    let fromAcctData = await atm.findAccountNumber(fromAccountNumber)
    let toAcctData = await atm.findAccountNumber(toAccountNumber)
    await atm.withdraw(fromAccountNumber, fromAcctData.endingBalance, transactionAmount)
    await atm.deposit(toAccountNumber, toAcctData.endingBalance, transactionAmount)
    res.redirect('/')
  } catch (err) {
    console.error(err);
  }
}


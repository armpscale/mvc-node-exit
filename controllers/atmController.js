const model = require('../models/model')

function openNewAccount(openAccount) {
    return new Promise((resolve, reject) => {
        openAccount
            .save()
            .then(result => {
                resolve(result)
            })
            .catch(err => { reject(err) })
    });
}

function findAccountNumber(accountNumber) {
    return new Promise((resolve, reject) => {
        model
            .findOne({ "accountNumber": accountNumber })
            .exec()
            .then(result => {
                resolve(result)
            })
            .catch(err => { reject(err) })
    });
}


function getAllAccount() {
    return new Promise((resolve, reject) => {
        model
            .find()
            .exec()
            .then(result => {
                resolve(result)
            })
            .catch(err => { reject(err) })
    });
}

function getAccountBalance(accountNumber) {
    return new Promise((resolve, reject) => {
        model
            .findOne({ "accountNumber": accountNumber })
            .exec()
            .then(result => {
                resolve(result.endingBalance)
            })
            .catch(err => { reject(err) })
    });
}

function withdraw(accountNumber, endingBalance, transactionAmount) {
    return new Promise((resolve, reject) => {
        model
            .update(
                { "accountNumber": accountNumber },
                { "$set": { "endingBalance": endingBalance - transactionAmount } },
        )
            .then(result => {
                resolve(result)
            })
            .catch(err => { reject(err) })
    });
}

function deposit(accountNumber, endingBalance, transactionAmount) {
    return new Promise((resolve, reject) => {
        model
            .update(
                { "accountNumber": accountNumber },
                { "$set": { "endingBalance": endingBalance + transactionAmount } },
        )
            .then(result => {
                resolve(result)
            })
            .catch(err => { reject(err) })
    });
}

module.exports = {
    openNewAccount,
    findAccountNumber,
    getAllAccount,
    getAccountBalance,
    withdraw,
    deposit,
}
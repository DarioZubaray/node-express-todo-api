const express = require('express')

const getGreetings = (req, res) => {
    res.send('Hello World!')
}

module.exports = {
    getGreetings
}
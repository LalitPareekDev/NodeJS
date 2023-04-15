const express = require('express');
const productController = require('./product.controller');
const mainRouter = express.Router();

mainRouter.use('/product', productController);

mainRouter.get('/health', (req, res, next) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server Health is Good..!!!'
    })
})

module.exports = mainRouter;
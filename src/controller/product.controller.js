const express = require('express');
const ProductRepositories = require('../dao/repositories/product.repositories');

const productRouter = express.Router();

productRouter.post('/add-products', async (req, res, next) => {
    try {
        let {p_name, category, brand, color, price} = req.body;
        console.log(p_name, category, brand, color, price)

        if(!p_name) {
            res.status(404).json({
                statusCode: 404,
                status: 'Error',
                error: 'Product Name Missing..!!'
            })
            return;
        }
        if(!category) {
            res.status(404).json({
                statusCode: 404,
                status: 'Error',
                error: 'Category Name Missing..!!'
            })
            return;
        }
        if(!brand) {
            res.status(404).json({
                statusCode: 404,
                status: 'Error',
                error: 'Brand Name Missing..!!'
            })
            return;
        }
        if(!color) {
            res.status(404).json({
                statusCode: 404,
                status: 'Error',
                error: 'Color Name Missing..!!'
            })
            return;
        }
        if(!price) {
            res.status(404).json({
                statusCode: 404,
                status: 'Error',
                error: 'Price Name Missing..!!'
            })
            return;
        }
        
        let product = {
            p_name: p_name,
            category: category,
            brand: brand,
            color: color,
            price: price
        }
        let productResponse = await ProductRepositories.addProduct(product);
        if(productResponse.statusCode === 200) {
            console.log('Data Added.....!!!')
            res.status(productResponse.statusCode).json(productResponse)
            return;
        }
    }catch(error) {
        res.status(400).json({
            statusCode: 400,
            status: 'Error',
            error: error
        })
    }
})

productRouter.get('/get-all-products', async(req, res, next) => {
    try {
        let productResponse = await ProductRepositories.getAllProduct();
        if(productResponse.statusCode === 200) {
            console.log('data fatched...');
            res.status(productResponse.statusCode).json(productResponse)
            return;
        }
    }catch(error) {
        res.status(400).json({
            statusCode: 400,
            status: 'Error',
            error: error
        })
    }
})

productRouter.get('/get-product-by-name', async(req, res, next) => {
    try {
        let p_name = req.body.p_name;
        let productResponse = await ProductRepositories.getOneProduct(p_name);
        if(productResponse.statusCode === 200) {
            console.log('Product fatched....');
            res.status(productResponse.statusCode).json(productResponse)
            return;
        }
    }catch(error) {
        res.status(400).json({
            statusCode: 400,
            status: 'Error',
            error: error
        })
    }

})

productRouter.put('/update-product', async(req, res, next) => {
    let updateProduct = req.body.updateProduct;
    let {p_name, category, brand, color, price} = req.body;

    if(!p_name) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Product Name Missing..!!'
        })
        return;
    }
    if(!category) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Category Name Missing..!!'
        })
        return;
    }
    if(!brand) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Brand Name Missing..!!'
        })
        return;
    }
    if(!color) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Color Name Missing..!!'
        })
        return;
    }
    if(!price) {
        res.status(404).json({
            statusCode: 404,
            status: 'Error',
            error: 'Price Name Missing..!!'
        })
        return;
    }
    
    let product = {
        p_name: p_name,
        category: category,
        brand: brand,
        color: color,
        price: price
    }
    try {
        let productResponse = await ProductRepositories.updateProduct(updateProduct, product);
        if(productResponse.statusCode === 201) {
            console.log('Data Updated...!!')
            res.status(productResponse.statusCode).json(productResponse);
            return;
        }
    }catch(error) {
        res.status(400).json({
            statusCode: 400,
            status: 'Error',
            error: error
        })
    }
})

productRouter.delete('/delete-product', async(req, res, next) => {
    let product = req.body.product
    try {
        let productResponse = await ProductRepositories.deleteProduct(product);
        console.log('product deleted...');
        if(productResponse.statusCode === 200) {
            res.status(productResponse.statusCode).json(productResponse);
            return;
        }
    }catch(error) {
        res.status(400).json({
            statusCode: 400,
            status: 'Error',
            error: error
        })
    }
})

module.exports = productRouter;
const productModel = require('../schemas/product_schema');
require('../../services/mongodb-database');

const addProduct = async (data) => {
    try {
        let { p_name, category, brand, color, price } = data;
        const insertProduct = new productModel({
            p_name: p_name,
            category: category,
            brand: brand,
            color: color,
            price: price
        });
        const result = await insertProduct.save()
        console.log(result);
        return {
            status: 'Success',
            statusCode: 200,
            message: 'Product Added Successfully..!!',
            data: result
        }

    } catch (error) {
        console.log(error)
        return {
            status: 'Error',
            statusCode: 404,
            message: 'Product Not Added Something Wents Wrong..!!',
            error: error
        }
    }
}

const getAllProduct = async () => {

    try {
        const result = await productModel.find();
        console.log(result);
        return {
            status: 'Success',
            statusCode: 200,
            message: ' All Data Fatched Sucsessfully..!!',
            data: result
        }
    } catch (error) {
        console.log(error)
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Data Not Found..!!',
            error: error
        }
    }
}

const getOneProduct = async (data) => {
    try {
        const result = await productModel.findOne({'p_name':data});
        console.log(result);
        return {
            status: 'Success',
            statusCode: 200,
            message: 'One Record Fetched Successfully..!!',
            data: result
        }
    }catch(error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Record Not Found..!!',
            error: error
        }
    }

}

const updateProduct = async (updateData, updateFor) => {
    try {
        const result = await productModel.updateOne({'p_name': updateData}, {$set: {
            'p_name': updateFor.p_name, 
            'category': updateFor.category, 
            'brand': updateFor.brand,
            'color': updateFor.color,
            'price': updateFor.price
         }})
         console.log('Result:', result);
         return {
            status:'Success',
            statusCode: 201,
            message: 'Data Updated Successfully..!!',
            data: await productModel.findOne({'p_name':updateFor.p_name})
         }
    }catch (error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Somethings Wents Wrong..!!',
            error: error
        }
    }
}

let deleteProduct = async (data) => {
    try {
        const result = await productModel.deleteOne({'p_name': data})
        console.log(result);
        return {
            status: 'Seccess',
            statusCode: 200,
            message: 'Data Deleted Seccessfully..!!',
            data: result
        }
    }catch(error) {
        console.log(error);
        return {
            status: 'Failed',
            statusCode: 404,
            message: 'Something Wents Wrong..!!',
            error: error
        }
    }
}

// let updateFor = {
//     p_name : 'iPhone 13',
//     category : 'Mobile',
//     brand : 'Apple',
//     color : 'Red',
//     price : 50000
// }
// deleteProduct('vivo v7+').then(data => console.log(data)).catch(error => console.log(error))

//  addProduct({
//     p_name : 'vivo v7+',
//     category : 'Mobile',
//     brand : 'Vivo',
//     color : 'Black',
//     price : 21000
// }).then(data => console.log(data)).catch(error => console.log(error))

module.exports = { addProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct};
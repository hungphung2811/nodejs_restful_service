import formidable from 'formidable';
import fs from 'fs';
import Product from '../models/product.model';
import _, { orderBy } from "lodash";

// @get id  - :id => product(product._id === id)
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json(
                { error: "khong tim thay san pham" }
            )
        }
        req.product = product;
        next();
    })
}

// @create product [POST] /products
export const createProduct = (req, res) => {
    // required: name, image,price,quantity, instock,decription,categoryId
    const product = new Product(req.body)
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "khoong them dc san pham"
            })
        }
        res.json(data)
    })
}

// @getAll products - [GET] /products?optional
export const getListProduct = (req, res) => {
    let order = req.query._order ? req.query._order : 'asc';
    let sortBy = req.query._sort ? req.query._sort : '_id';
    let limit = req.query._limit ? +req.query._limit :6;

    if (req.query.categoryId) {
        Product.find({ categoryId: req.query.categoryId })
            .limit(limit)
            .sort([[sortBy, order]])
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        error: "Product not found"
                    })
                }
                res.json(data)
            })
    } else {
        Product.find({})
            .limit(limit)
            .sort([[sortBy, order]])
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: "Product not found"
                    })
                }
                res.json(data)
            })
    }
}

// @getOne product - [GET] /products/:productId
export const getOneProduct = (req, res) => {
    return res.json(req.product);
}

// @update product - [UPDATE] /products/:productId
export const updateProduct = (req, res) => {

    let product = req.product;
    product = _.assignIn(product, { ...req.body })

    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "khoong them dc san pham"
            })
        }
        res.json(data)
    })
}

// @delete product - [DELETE] /products/:productId
export const deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "khong xoa dc san pham"
            })
        }
        res.json({ deleteProduct, message: "xoa san pham thanh cong" })
    })
}
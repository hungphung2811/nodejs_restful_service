import formidable from 'formidable';
import fs from 'fs';
import Product from '../models/product-model';
import _ from "lodash";

// @get id  - /:id => id
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
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, filds, files) => {
        if (err) {
            return res.status(400).json({
                error: "them san pham khong thanh cong"
            })
        }

        const { name, description, price } = filds;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ các trường"
            })
        }

        const product = new Product(filds);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "khoong them dc san pham"
                })
            }
            res.json(data)
        })
    });
}

// @getAll products - [GET] /products
export const getListProduct = (req, res, next) => {
    Product.find((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "khong tim thay san pham"
            })
        }
        res.json(data);
    })
}

// @getOne product - [GET] /products/:productId
export const getOneProduct = (req, res) => {
    return res.json(req.product);
}

// @update product - [UPDATE] /products/:productId
export const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, filds, files) => {
        if (err) {
            return res.status(400).json({
                error: "sua san pham khong thanh cong"
            })
        }
        const { name, description, price } = filds;
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ các trường"
            })
        }

        let product = req.product;
        product= _.assignIn(product,filds)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "khoong them dc san pham"
                })
            }
            res.json(data)
        })
    });
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
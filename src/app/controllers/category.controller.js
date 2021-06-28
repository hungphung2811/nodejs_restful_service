import formidable from 'formidable';
import fs from 'fs';
import Category from '../models/category.model';
import _ from "lodash";

// /:id => id
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json(
                { error: "khong tim thay san pham" }
            )
        }
        req.category = category;
        next();
    })
}

// [POST] /category
export const createCategory = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "khoong them dc category"
            })
        }
        res.json(data)
    })
}

// [GET] /category
export const getListCategory = (req, res) => {
    let order = req.query._order ? req.query._order : 'asc';
    let sortBy = req.query._sort ? req.query._sort : '_id';
    let limit = req.query._limit ? +req.query._limit : 10;
    Category.find({})
        .limit(limit)
        .sort([[sortBy, order]])
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "category not found"
                })
            }
            res.json(data)
        })
}

// [GET] /category/:categoryId
export const getOneCategory = (req, res) => {
    return res.json(req.category);
}

// [UPDATE] /category/:categoryId
export const updateCategory = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, filds, files) => {
        if (err) {
            return res.status(400).json({
                error: "sua san pham khong thanh cong"
            })
        }
        const { name, description} = filds;
        if (!name || !description) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ các trường"
            })
        }

        let category = req.category;
        category = _.assignIn(category, filds)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentType = files.photo.type;
        }
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "khoong them dc category"
                })
            }
            res.json(data)
        })
    });
}

// [DELETE] /category/:categoryId
export const deleteCategory = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                error: "khong xoa dc san pham"
            })
        }
        res.json({ deleteProduct: deleteCategory, message: "xoa category thanh cong" })
    })
}
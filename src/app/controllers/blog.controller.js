import formidable from 'formidable';
import fs from 'fs';
import BlogModel from '../models/blog.model';
import _ from "lodash";

// /:id => id
export const blogId = (req, res, next, id) => {
    BlogModel.findById(id).exec((err, blog) => {
        if (err || !category) {
            return res.status(400).json(
                { error: "khong tim thay blog nao" }
            )
        }
        req.blog = blog;
        next();
    })
}

// [POST] /category
export const createBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, filds, files) => {
        if (err) {
            return res.status(400).json({
                error: "them category khong thanh cong"
            })
        }

        const { name, description } = filds;
        if (!name || !description) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ các trường"
            })
        }

        const blog = new BlogModel(filds);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }
        blog.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "khoong them dc san pham"
                })
            }
            res.json(data)
        })
    });
}

// [GET] /category
export const getListBlog = (req, res) => {
    BlogModel.find((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "khong tim thay category"
            })
        }
        res.json(data);
    })
}

// [GET] /category/:categoryId
export const getOneBlog = (req, res) => {
    return res.json(req.blog);
}

// [UPDATE] /category/:categoryId
export const updateBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, filds, files) => {
        if (err) {
            return res.status(400).json({
                error: "sua san pham khong thanh cong"
            })
        }
        const { name, description } = filds;
        if (!name || !description) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ các trường"
            })
        }

        let blog = req.blog;
        blog = _.assignIn(blog, filds)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1mb"
                })
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }
        blog.save((err, data) => {
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
export const deleteBlog = (req, res) => {
    let blog = req.blog;
    blog.remove((err, deleteBlog) => {
        if (err) {
            return res.status(400).json({
                error: "khong xoa dc san pham"
            })
        }
        res.json({ deleteProduct: deleteBlog, message: "xoa category thanh cong" })
    })
}
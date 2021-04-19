import express from 'express';
import { createBlog, deleteBlog, getListBlog, getOneBlog, blogId, updateBlog } from '../app/controllers/blog.controller';

const routerBlog = express.Router();

routerBlog.param('blogId', blogId);

routerBlog.get('/', getListBlog);

routerBlog.get('/:blogId', getOneBlog);

routerBlog.post('/', createBlog);

routerBlog.delete('/:blogId', deleteBlog);

routerBlog.put('/:blogId', updateBlog);

module.exports = routerBlog;

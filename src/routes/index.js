import routerProduct from './product.route';
import routerCategory from './category.route';
import routerAuth from './auth.route';
import routerUser from './user.route';
import routerOrder from './order.route';
import routerBlog from './blog.route';

function router(app) {
    app.use('/api/order', routerOrder);
    app.use('/api/users', routerUser);
    app.use('/api/blogs', routerBlog);
    app.use('/api/category', routerCategory);
    app.use('/api/products', routerProduct);
    app.use('/api', routerAuth);
}

module.exports = router;

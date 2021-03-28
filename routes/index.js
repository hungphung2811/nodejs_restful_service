import routerProduct from './product.route';
import routerCategory from './category.route';
function router(app){
    app.use('/api/category', routerCategory);
    app.use('/api/products', routerProduct);
}

module.exports = router;

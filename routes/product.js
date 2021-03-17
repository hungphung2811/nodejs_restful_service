import express from 'express';

const routerProduct = express.Router();

routerProduct.get('/products',(req,res) => {
    res.send('list product');
});

routerProduct.post('/products', (req, res) => {
    res.send('post product');
});

routerProduct.delete('/products/:id', (req, res) => {
    res.send(`delete product ${req.params.id}`);
});

routerProduct.put('/products/:id', (req, res) => {
    res.send('put product');
});

module.exports = routerProduct;

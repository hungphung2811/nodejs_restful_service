import express from 'express';

const router = express.Router();

router.get('/products', (req, res) => {
    res.send('list product');
});

router.post('/products', (req, res) => {
    res.send('post product');
});

router.delete('/products/:id', (req, res) => {
    res.send('delete product');
});

router.put('/products/:id', (req, res) => {
    res.send('put product');
});

module.exports = router;

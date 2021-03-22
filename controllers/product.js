import Product from '../models/product';

export const getListProduct = (req, res, next) => {
    Product.find({})
        .then((products) => res.json(products))
        .catch((error) => next(error))
}

export const createProduct = (req, res) => {
    const product = new Product(req.body);
    console.log(product);
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'product error'
            })
        }
        res.json(data);
    })
}

export const deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) return res.status(400).send(err);
        const response = {
            message: "Todo successfully deleted",
            id: product.id
        };
        res.json(response);
    });
}

export const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, product) => {
            if (err) return res.status(400).send(err);
            return res.send(product);
        }
    )
}
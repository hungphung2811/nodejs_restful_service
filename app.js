import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productRoutes from './routes/product.js';

const app = express();
dotenv.config();
app.use(morgan('dev'));

//  routes
app.use('/api', productRoutes);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
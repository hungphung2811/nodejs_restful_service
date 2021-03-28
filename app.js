import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './routes/';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(morgan('dev'));

// connection mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected'))
.catch(err => console.log('error',err));

mongoose.connection.on('error', (err) => {
    console.log(`error ${err.message}`)
});

//  routes
router(app);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
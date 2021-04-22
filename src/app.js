import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './routes/';

// create instance app & middleware
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// connection mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected'))
    .catch(err => console.log('error', err));

mongoose.connection.on('error', (err) => {
    console.log(`error ${err.message}`)
});

//  routes
router(app);

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
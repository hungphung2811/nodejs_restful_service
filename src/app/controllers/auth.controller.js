import UserModel from '../models/user.model';
const jwt = require('jsonwebtoken');
import expressJwt from 'express-jwt';
require('dotenv').config();

export const signup = (req, res) => {
    const user = new UserModel(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "k thể thêm user"
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json(user);
    })
}

export const signin = (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email }, (err, user) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                errorEmail: "Email ko ton tai "
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                errorPassword: 'Password không đúng'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 60 * 60 });
        user.salt = undefined;
        user.hashed_password = undefined;
        return res.json(
            {
                token, user
            }
        )
    })
}

export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}

export const userById = (req, res, next, id) => {
    UserModel.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

export const checkEmail = (req, res, next) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            return res.status(400).json({ error: { errorEmail: "email da duoc su dung" } })
        }
        next();
    });
}

export const isToken = (req, res, next) => {
    if (req.header('Authorization') == 'Bearer undefined') {
        return res.json({
            errorToken: "khong co token"
        })
    }
    next();
}

export const isAuth = (req, res, next) => {
    let user = req.auth;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    UserModel.findOne({ _id: user._id }, (err, data) => {
        if (err) {
            return res.status(403).json({
                error: "khong tim thay user"
            })
        }
        let newData = { ...data }
        newData.salt = undefined;
        newData.hashed_password = undefined;
        req.userLogined = newData._doc;
        next();
    });
}

export const isAdmin = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id.toString('hex') == req.auth._id;
    if (!user || req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}
import UserModel from '../models/user.model';
require('dotenv').config();

export const userById = (req, res, next, id) => {
    UserModel.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}

export const getAllUsers = (req, res) => {
    UserModel.find((err, data) => {
        if (err) {
            return res.json({
                error: "khong tim tahy user"
            })
        }
        res.json(data)
    })
}


export const readUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
}

export const updateUser = (req, res) => {
    UserModel.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'khong co tuoi execute'
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(user);
        }
    )
}
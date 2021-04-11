import UserModel from '../models/user.model';
const jwt = require('jsonwebtoken');
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
                error: "email ko ton tai "
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 60 * 60 });
        const { _id, name, email, role } = user;
        return res.json(
            {
                token, user: { _id, email, name, role }
            }
        )
    })
}

export const signout =(req,res)=>{
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}
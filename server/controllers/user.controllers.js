const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
        
                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 60 * 1000
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
        },

    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000
            })
            .json({ msg: "success!" });
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    getAll: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch((err => res.json(err)));
    },
    findOne: (req, res) => {
        User.findById(req.params._id)
            .then(oneUser => res.json(oneUser))
            .catch(err => res.json(err));
    },
}
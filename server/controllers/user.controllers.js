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

    login: async (req, res) => {
        try {
            // 1. Find user by email
            const user = await User.findOne({ email: req.body.email });
    
            // 2. Handle invalid email
            if (!user) {
                res.status(400).json({ msg: "Invalid email" });
                return;
            }
            // 3. Compare password with stored hash
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            // 4. Handle incorrect password
            if (!correctPassword) {
                res.status(400).json({ msg: "Invalid password" });
                return;
            }
            // 5. Generate JWT and set cookie
            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                res.cookie("usertoken", userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
                .json({ msg: "success!" });
        } catch (error) {
            console.error(error); // Log any errors for debugging
            res.status(500).json({ msg: "Internal server error" });
        }
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
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
}
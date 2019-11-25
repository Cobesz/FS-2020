// Load required packages
const User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (!err) {

            res.json({message: 'New beer drinker added to the locker room!'});
        } else {
            res.send(err);
        }

    })
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (!err) {
            res.json(users);
        } else {
            res.send(err);
        }
    });
};

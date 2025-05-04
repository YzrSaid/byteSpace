const bcrypt = require('bcryptjs');
const userModel = require('../models/userModels');

// Signup controller
const signup = (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error: Hashing Failed!');
        }

        // Create user
        const user = { first_name, last_name, email, username, password: hashedPassword };
        userModel.createUser(user, (err, result) => {
            if (err) {
                return res.status(500).send('Error: Adding new user failed. Try again!');
            }

            res.status(201).send('User created successfully!');
        });
    });
};

// Login controller 
const login = (req, res) => {
    const { username, password } = req.body;

    userModel.findUserbyUsername(username, (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).send('Invalid username or password');
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(500).send('Invalid username or password');
            }

            // Store user info in session
            req.session.user = {
                id: user.user_id,
                username: user.username
            };

            res.status(200).send('Login successful!');
        });
    });
};

module.exports = {
    signup,
    login
}
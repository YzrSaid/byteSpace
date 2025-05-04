const db = require('../config/db');

// function to find a user by username
const findUserbyUsername = (username, callback) => {
    const query = 'SELECT * from tblusers WHERE username = ?';
    db.query(query, [username], callback);
}

// function to insert a new user
const createUser = (user, callback) => {
    const query = 'INSERT INTO tblusers (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.first_name, user.last_name, user.email, user.username, user.password], callback);
}

module.exports = {
    findUserbyUsername,
    createUser
}

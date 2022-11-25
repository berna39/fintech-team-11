const db = require('../db/db');
const bcrypt = require('bcrypt');

module.exports.register = async(req, res, next) => {
    let data = req.body;
    const salt = await bcrypt.genSalt(10);
    let hashedPasssword = bcrypt.hashSync(data.password, salt);
    data.password = hashedPasssword;
    if(db.register(data))
    {
        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        }
    } else { 
        req.session.message = {
            type: 'danger',
            message: 'Error occured when processing this operation'
        }
    }
    res.redirect('/register');
}

module.exports.login = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let result = await db.login(username);
    if(result.length && bcrypt.compareSync(password, result[0].password)){
        req.session.username = result[0].username;
        res.redirect('/');
    } else {
        req.session.message = {
            type: 'danger',
            message: 'Login failed'
        }
        res.redirect('/login');
    }
}

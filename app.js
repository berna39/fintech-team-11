const express = require('express');
const dotnenv = require('dotenv');
const session = require('express-session');
const app = express();
const router = require('./routes/routes');

dotnenv.config();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'my secret',
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message
    next();
});

app.use(router);

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 2500;
app.listen(PORT, (err) => {
    console.log(`App up and running on ${PORT}`);
});
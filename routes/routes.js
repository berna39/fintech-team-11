const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.get('/', auth, async(req, res) => {
    console.log(req.session)
    res.render('index', {data: 'Hello from team 11'});
});

router.get('/login', async(req, res) => {
    res.render('login', {data: 'Hello from team 11'});
});

router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

router.get('/register', async(req, res) => {
    res.render('register', {data: 'Hello from team 11'});
});

router.post('/register', authController.register);

module.exports = router;

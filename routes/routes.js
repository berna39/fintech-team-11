const router = require('express').Router();

router.get('/', async(req, res) => {
    res.send({message: 'This is the fintech team 11'});
});

module.exports = router;


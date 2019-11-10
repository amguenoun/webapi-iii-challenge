const router = require('express').Router();

const db = require('./userDb');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userID = req.params.id;
    console.log(userID);
    db.getById(userID)
        .then(user => {
            console.log(user);
            req.user = user;
            next();
        })
        .catch(err => res.status(404).json({ message: 'Invalid user id' }));
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};


module.exports = router;

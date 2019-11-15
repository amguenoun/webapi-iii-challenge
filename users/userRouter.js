const router = require('express').Router();

const db = require('./userDb');
const postdb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
        .then((data) => res.status(201).json(data))
        .catch(err => res.status(500).json({ message: 'could not post user' }));
});

router.post('/:id/posts', validatePost, (req, res) => {
    postdb.insert(req.body)
        .then((data) => res.status(201).json(data))
        .catch(err => res.status(500).json({ message: 'could not post post' }));
});

router.get('/', (req, res) => {
    db.get()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: 'The users could not be retrieved' }));
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    db.getUserPosts(req.user.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: 'The user\'s posts could not be retrieved' }))
});

router.delete('/:id', validateUserId, (req, res) => {
    db.remove(req.user.id)
        .then(data => res.status(200).json({ message: `user with id ${req.user.id} has been deleted` }))
        .catch(err => res.status(500).json({ message: `user with id ${req.user.id} could not be deleted` }))

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    db.update(req.user.id, req.body)
        .then(data => res.status(200).json({ message: `user with id ${req.user.id} has been updated` }))
        .catch(err => res.status(500).json({ message: `user with id ${req.user.id} could not be updated` }))
});

//custom middleware

function validateUserId(req, res, next) {
    const userID = req.params.id;
    db.getById(userID)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'Invalid user id' })
            }
            else {
                req.user = user;
                next();
            }

        })
        .catch(err => res.status(404).json({ message: 'Invalid user id' }));
};

function validateUser(req, res, next) {
    const user = req.body;
    if (!user) {
        res.status(400).json({ message: "missing user data" });
    }
    else if (!user.name) {
        res.status(400).json({ message: 'missing required name field' });
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    const post = req.body;
    console.log(post);
    if (!post) {
        res.status(400).json({ message: "missing post data" });
    }
    else if (!post.text) {
        res.status(400).json({ message: 'missing required text field' });
    } else {
        next();
    }
};


module.exports = router;

const express = require('express');
const router = express.Router();
const { Error, Success } = require('../util/routes');
const { registerUser, authenticateUser } = require('../user/usecase');
const { NewUser, AuthenticationRequest } = require('../user/entity');


router.post(
    '/register',
    (req, res) => registerUser(NewUser(req.body))
        .then(
            Success(res)(200),
            Error(res)(400)
        )
);

router.post(
    '/login',
    (req, res) => authenticateUser(AuthenticationRequest(req.body))
        .then(
            Success(res)(200), 
            Error(res)(400)
        )
);

module.exports = router;

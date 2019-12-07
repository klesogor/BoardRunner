
const bcrypt = require('bcrypt');
const {IncorrectPassword } = require('../util/errors');

const verifyPassword = password => user => bcrypt.compare(password, user.password)
.then(
    S.ifElse(
        Boolean,
        () => user,
        () => Promise.reject(new IncorrectPassword('Incorrect password'))
    )
);

module.exports = exports = {verifyPassword};
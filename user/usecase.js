const { saveUser, findUser } = require('./dal');
const { EncryptedPassword } = require('./entity');
const { AlreadyExists } = require('../util/errors');
const BL = require('./bl');
const S = require('sanctuary');

const registerUser = user => findUser({ email: user.email })
    .then(
        S.maybe_
            (() => EncryptedPassword(user).then(saveUser))
            (() => Promise.reject(new AlreadyExists('User already exists!')))
    );

const authenticateUser = ({ email, password }) => findUser({ email })
    .then(BL.verifyPassword(password));

module.exports = exports = { registerUser, authenticateUser }
const DB = require('../util/db');
const S = require('sanctuary');
const SMaybe = require('sanctuary-maybe');
const { save } = require('../util/dal');
const { filter } = require('sanctuary');

const saveUser = user => save(DB.collection('users'), user);
const findUser = ({ email }) => DB.collection('users')
    .findOne(filter(Boolean)({ email }))
    .then(S.of(SMaybe));

module.exports = exports = { saveUser, findUser };
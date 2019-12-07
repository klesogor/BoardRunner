const DB = require('../util/db');
const DAL = require('../util/dal');
const S = require('sanctuary');
const SMaybe = require('sanctuary-maybe');

const saveBoard = DAL.save(DB.collection('boards'))
const findBoard = _id => DB.collection('boards')
    .find({ _id })
    .then(S.of(SMaybe))
module.exports = { saveBoard, findBoard };
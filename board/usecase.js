const DAL = require('./dal');
const S = require('sanctuary');
const BL = require('./bl');
const SMaybe = require('sanctuary-maybe');
const SEither = require('sanctuary-either');
const FP = require('../util/FP');
const { BLException } = require('../util/errors');

const newBoard = (boardDTO, user) =>
    DAL.saveBoard(BL.createBoard(boardDTO, user))

const updateBoard = ({ boardDTO, user }) =>
    DAL.findBoard(boardDTO._id)
        .then(maybeBoard => [maybeBoard, user])
        .then(([maybeBoard, user]) => BL.updateBoard(maybeBoard, user, boardDTO))
        .then(FP.eitherAsync)
        .then(DAL.saveBoard);

const addColumn = ({ columnDTO, user }) =>
    DAL.findBoard(columnDTO.boardId)
        .then(maybeBoard => [maybeBoard, user])
        .then(([maybeBoard, user]) => BL.addColumn(maybeBoard, user, columnDTO))
        .then(FP.eitherAsync)
        .then(DAL.saveBoard);

module.exports = exports = { newBoard, updateBoard, addColumn }
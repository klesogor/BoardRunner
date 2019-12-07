const DAL = require('./dal');
const S = require('sanctuary');
const BL = require('./bl');
const SMaybe = require('sanctuary-maybe');
const SEither = require('sanctuary-either');
const FP = require('../util/FP');
const { BLException } = require('../util/errors');

const newBoard = (boardDTO, maybeUser) =>
    FP.maybeAsync(new BLException('Unauthorized'))(maybeUser)
        .then(user =>
            DAL.saveBoard({
                ...boardDTO,
                creatorId: user._id,
                columns: []
            })
        )

const updateBoard = ({ boardDTO, maybeUser }) =>
    DAL.findBoard(boardDTO._id)
        .then(maybeBoard => S.sequence(SMaybe)([maybeBoard, maybeUser]))
        .then(FP.maybeAsync(new BLException('Invalid inputs')))
        .then(([board, user]) => BL.updateBoard(board, user, boardDTO))
        .then(FP.eitherAsync)
        .then(DAL.saveBoard);

const addColumn = ({ columnDTO, maybeUser }) =>
    DAL.findBoard(columnDTO.boardId)
        .then(maybeBoard => S.sequence(SMaybe)([maybeBoard, maybeUser]))
        .then(FP.maybeAsync(new BLException('Invalid inputs')))
        .then(([board, user]) => BL.addColumn(board, user, columnDTO))
        .then(FP.maybeAsync)
        .then(DAL.saveBoard);

const addTicket = 

module.exports = exports = { newBoard, updateBoard, addColumn }
const S = require('sanctuary');
const SMaybe = require('sanctuary-maybe');
const SEither = require('sanctuary-either');
const FP = require('../util/FP');
const { BLException } = require('../util/errors');

const authorizeBoardAction = (board, user) => board.creatorId === user._id
    ? SEither.Right(board)
    : SEither.Left(new BLException('Unauthorized'));

const updateBoardData = boardDTO => board => ({ ...board, ...boardDTO });

const updateBoard = (board, user, boardDTO) =>
    S.pipe([
        authorizeBoardAction(board, user),
        S.map(updateBoardData(boardDTO))
    ])();

const addColumn = (board, user, columnDto) =>
    S.pipe([
        authorizeBoardAction(board, user),
        S.map(board => board.columns.push(columnDto))
    ])();

const addTicketToColumn = (board, user, columnName, ticketDto) =>
    S.pipe([
        authorizeBoardAction(user, board),
        S.find(x => x.name === columnName),
        S.map(column => column.tickets.push(column)),
        S.map(column => ({
            ...board,
            columns: board.colomns.map(x => x.name === column ? column : x)
        }))
    ])()

module.exports = { updateBoard, addColumn, addTicketToColumn }
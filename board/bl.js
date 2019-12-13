const S = require('sanctuary');
const FP = require('../util/FP');
const { BLException, NotFound } = require('../util/errors');

const validateBoardCreator = ([board, user]) =>
    board.creatorId === user._id
        ? S.Right([board, user])
        : S.Left(new BLException('Unauthorized'));

const unwrapBoardMaybes = ([boardMaybe, userMaybe]) => [
    S.maybeToEither(new NotFound('board not found'))(boardMaybe),
    S.maybeToEither(new BLException('unauthorized'))(userMaybe)
];

const authorizeBoardAction = S.pipe([
    unwrapBoardMaybes,
    S.sequence(S.Either),
    S.chain(validateBoardCreator)
]);

const createBoard = (board, maybeUser) =>
    S.pipe([
        S.maybeToEither(new BLException('Unauthorized')),
        S.map(user =>
            ({
                ...board,
                creatorId: user._id,
                columns: []
            })
        )
    ])(maybeUser)

const updateBoardData = boardDTO => board => ({ ...board, ...boardDTO });

const updateBoard = (maybeBoard, maybeUser, boardDTO) =>
    S.pipe([
        authorizeBoardAction,
        S.map(FP.first),
        S.map(updateBoardData(boardDTO))
    ])([maybeBoard, maybeUser]);

const _addColumn = column => board => ({
    ...board,
    columns: board.columns.concat(column)
});

const addColumn = (maybeBoard, maybeUser, columnDto) =>
    S.pipe([
        authorizeBoardAction,
        S.map(FP.first),
        S.map(_addColumn(columnDto)),
    ])([maybeBoard, maybeUser]);

const replaceColumnByName = board => column => ({
    ...board,
    columns: board.columns.map(col => col.name === column.name ? column : col)
});

const _addTicketToColumn = ticket => column => ({ ...column, tickets: column.tickets.concat(ticket) });

const findColumn = columnName => S.pipe([
    S.prop('columns'),
    S.find(x => x.name === columnName),
    S.maybeToEither(new NotFound('Column not found'))
]);
const addTicketToColumn = (maybeBoard, maybeUser, columnName, ticketDto) =>
    S.pipe([
        authorizeBoardAction,
        S.map(FP.first),
        S.chain(board =>
            S.pipe([
                findColumn(columnName),
                S.map(_addTicketToColumn(ticketDto)),
                S.map(replaceColumnByName(board))
            ])(board)
        )
    ])([maybeBoard, maybeUser])

module.exports = { updateBoard, addColumn, addTicketToColumn, createBoard, authorizeBoardAction }
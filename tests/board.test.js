const BoardBL = require('../board/bl');
const mockBoard = { name: 'Mock board' };
const mockUser = { name: 'Mock user', _id: 'fake' };
const S = require('sanctuary');
const FP = require('../util/FP');
const Err = require('../util/errors');

describe('Create board tests', () => {
    it('Should succesfully create board', () => {
        const board = BoardBL.createBoard(mockBoard, S.Just(mockUser));
        expect(S.fromEither({})(board)).toMatchObject({
            ...mockBoard,
            creatorId: mockUser._id,
            columns: []
        });
    });
});

describe('Update board tests', () => {
    it('Should fail on no user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.updateBoard(S.Just(board), S.Nothing, {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on no board', () => {
        const res = BoardBL.updateBoard(S.Nothing, S.Just(mockUser), {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on wrong user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.updateBoard(S.Just(board), S.Just({ _id: 'wrong' }), {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should succeed', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.updateBoard(S.Just(board), S.Just(mockUser), { name: 'new cool name' });
        expect(S.fromEither({})(res).name).toBe('new cool name');
    });
});

describe('Add column tests', () => {
    it('Should fail on no user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.addColumn(S.Just(board), S.Nothing, {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on no board', () => {
        const res = BoardBL.addColumn(S.Nothing, S.Just(mockUser), {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on wrong user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.addColumn(S.Just(board), S.Just({ _id: 'wrong' }), {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should succeed', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.addColumn(S.Just(board), S.Just(mockUser), { name: 'some cool name', tickets: [] });
        const unwraped = S.fromEither({ columns: [] })(res);
        expect(unwraped.columns.length).toBe(1);
    });
});

describe('Add ticket tests', () => {
    it('Should fail on no user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.addTicketToColumn(S.Just(board), S.Nothing, 'fake', {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on no board', () => {
        const res = BoardBL.addTicketToColumn(S.Nothing, S.Just(mockUser), 'fake', {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on wrong user', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const res = BoardBL.addTicketToColumn(S.Just(board), S.Just({ _id: 'wrong' }), 'fake', {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should fail on wrong column', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const boardWithColumn = S.fromEither({})(BoardBL.addColumn(S.Just(board), S.Just(mockUser), { name: 'test', tickets: [] }));
        const res = BoardBL.addTicketToColumn(S.Just(boardWithColumn), S.Just(mockUser), 'fake', {});
        expect(S.isLeft(res)).toBe(true);
    });
    it('Should succeed', () => {
        const board = S.fromEither({})(BoardBL.createBoard(mockBoard, S.Just(mockUser)));
        const boardWithColumn = S.fromEither({})(BoardBL.addColumn(S.Just(board), S.Just(mockUser), { name: 'test', tickets: [] }));
        const res = BoardBL.addTicketToColumn(S.Just(boardWithColumn), S.Just(mockUser), 'test', { name: 'test' });
        expect(S.fromEither({ columns: [{ tickets: [] }] })(res).columns[0].tickets.length).toBe(1);
    });

    describe('Timeouts', () => {
        it('Sould timeout', () => {
            Promise.race(
                FP.delay(100),
                FP.delay(50).then(() => Promise.reject('Timeout'))
            ).then(() => expect(false).toBe(true))
                .catch(() => expect(true).toBe(true))
        });
        it('Sould not timeout', () => {
            Promise.race(
                FP.delay(50),
                FP.delay(100).then(() => Promise.reject('Timeout'))
            ).then(() => expect(true).toBe(true))
                .catch(() => expect(false).toBe(true))
        });
    });
});
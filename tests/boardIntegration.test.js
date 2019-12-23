const app = require('../app');
const request = require('supertest');
const mockBoard = {
    _id: 'MOCK',
    name: "Mock board",
    columns: [
        {
            name: "test",
            tickets: [
                {
                    name: "Test ticket"
                }
            ]
        }
    ]
}

describe('Create board tests', () => {
    it('Should succesfully create board', () => {
        request(app)
        .post('/board')
        .send(mockBoard)
        .expect(200,done)
    });
});

describe('Update board tests', () => {
    it('Should fail on no user', () => {
        request(app)
        .post(`/board/MOCK`)
        .send(mockBoard)
        .expect(401,done);
    });
    it('Should fail on no board', () => {
        request(app)
        .post(`/board/null`)
        .send(mockBoard)
        .expect(404,done);
    });
    it('Should fail on wrong user', () => {
        request(app)
        .post(`/board/MOCK`)
        .set('X-Auth', 'FAKE')
        .send(mockBoard)
        .expect(401,done);
    });
    it('Should succeed', () => {
        request(app)
        .post(`/board/MOCK`)
        .set('X-Auth', 'MOCK')
        .send(mockBoard)
        .expect(404,done);
    });
});

describe('Add column tests', () => {
    it('Should fail on no user', () => {
        request(app)
        .post(`/board/MOCK/column`)
        .send({})
        .expect(401,done);
    });
    it('Should fail on no board', () => {
        request(app)
        .post(`/board/null/column`)
        .send({})
        .expect(404,done);
    });
    it('Should fail on wrong user', () => {
        request(app)
        .post(`/board/column`)
        .set('X-Auth', 'FAKE')
        .send({})
        .expect(401,done);
    });
    it('Should succeed', () => {
        request(app)
        .post(`/board/column`)
        .set('X-Auth', 'FAKE')
        .send({ name: 'some cool name', tickets: [] })
        .expect(200,done);
    });
});

describe('Add ticket tests', () => {
    it('Should fail on no user', () => {
        request(app)
        .post(`/board/MOCK/column/test/ticket`)
        .send({})
        .expect(401,done);
    });
    it('Should fail on no board', () => {
        request(app)
        .post(`/board/null/column/test/ticket`)
        .send({})
        .expect(404,done);
    });
    it('Should fail on wrong user', () => {
        request(app)
        .post(`/board/column/test/ticket`)
        .set('X-Auth', 'FAKE')
        .send({})
        .expect(401,done);
    });
    it('Should succeed', () => {
        request(app)
        .post(`/board/column/test/ticket`)
        .set('X-Auth', 'FAKE')
        .send({ name: 'test' })
        .expect(200,done);
    });
});
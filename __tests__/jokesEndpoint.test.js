// test.todo('stuff')
const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const Users = require('../auth/usersModel');

describe('jokes endpoint', () => {
    it('should return "You shall not pass" when the token is not passed', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.body).toEqual({ message: 'You shall not pass!' })
    })

    it('should return 401 http status since we are not passing a token', async () =>{
        const res = await request(server).get('/api/jokes');
        expect(res.status).toBe(401);
    })
})
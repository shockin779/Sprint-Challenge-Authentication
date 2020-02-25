
const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const Users = require('../auth/usersModel');

describe('auth endpoint', () => {
    describe('registration', () => {
        it('should add users when they register', async () => {
            await Users.addUser({username: 'taco', password: 'money'})
            await Users.addUser({username: 'tiena', password: 'mylove'})

            const users = await Users.getUsers();
            expect(users).toHaveLength(2);
        })

        it('should return the added user', async () => {
            let [user] = await Users.addUser({username: 'sean', password: 'hello'});
            expect(user.username).toBe('sean');

            [user] = await Users.addUser({username: 'tiena-hockin', password:'iLoveSean4forever'});
            expect(user.password).toBe('iLoveSean4forever');
        })
    })

    describe('login', () => {
        it('should return json', async () => {
            const res = await request(server).post('/api/auth/login');
            expect(res.type).toBe('application/json');
        });

        it('should return 400 when no username/password is submitted', async () => {
            const res = await request(server).post('/api/auth/login');
            expect(res.status).toBe(400);
        })
    })
})

beforeEach(async () => {
    await db('users').truncate();
});